// initial image div markup maker
const imgDivMaker = (id, img) => {
    const tempPath = URL.createObjectURL(img) // creating the temporary image url for the src attribute in img tag

    $('.img-container').append(`
        <div id="outer-box-${id}" class="outer-box">
            <img src="" alt="" id="img-${id}" class="img">
            <div id="box-overlay-${id}" class="box-overlay asdasd asd"></div>
            <p id="title-${id}" class="title"></p>
        </div>
        `)
    $(`#img-${id}`).attr('src', tempPath)
}


// functionality for upload images from array
const uploader = async (id, img) => {
    const formData = new FormData()
    formData.append('image', img)

    // await is for making the ajax req asynchronusly for uploading a bunch of image one by one
    await $.ajax({
        type: 'POST',
        url: 'http://192.168.10.91:5000/upload-image', //'http://localhost:4500/upload-img',
        data: formData,
        contentType: false,
        // enctype: 'multipart/form-data',
        xhr: function () {
            const xhr = new XMLHttpRequest()
            xhr.upload.addEventListener('progress', (e) => {
                const { loaded, total } = e;
                const percentage = Math.ceil(loaded / total * 100)
                const updatedHeight = (100 - percentage)
                $(`#box-overlay-${id}`).css("height", `${updatedHeight}%`)
                $(`#title-${id}`).text(`${percentage}%`)
                // console.log(percentage)
            }, false)
            return xhr
        },
        processData: false,
        success: (result, status, xhr) => {
            console.log(result, status, xhr)
        }
    })
}

// functionality for uploading a single specific image 
const uploadSingleImg = (id) => {
    const input = $(document.createElement('input'))
    input.attr('type', 'file')
    console.log(input)
    input.trigger('click')
    input.on('change', async function (e) {
        let data;
        data = e.target.files[0]
        $(`#outer-box-${id}`).empty()
        const tempPath = URL.createObjectURL(data)
        console.log(tempPath)
        $(`#outer-box-${id}`).append(`
            <img src="" alt="" id="img-${id}" class="img">
            <div id="box-overlay-${id}" class="box-overlay"></div>
            <p id="title-${id}" class="title"></p>
        `)
        $(`#img-${id}`).attr('src', tempPath)
        
        await uploader(id, data)
    })

}

// making promise for img.onload
const imgPromise = (img) => {
    const tempPath = URL.createObjectURL(img)
    let image = new Image()
    image.src = tempPath
    return new Promise((resolve, reject) => {
        image.onload = function () {
            resolve({
                width: this.width,
                height: this.height
            })
        };
    })
}

// click event handler for retry button
$(document).on('click', '.retry-btn', function () {
    console.log(this)
    const id = $(this).attr('id').split('-')[1]
    uploadSingleImg(id)
})


// click event handler for the submit button for all images to upload
$('#submit-btn').on('click', async function (e) {
    e.preventDefault()
    const data = $('.img-upload')[0].files
    for (const [id, img] of [...data].entries()) {
        imgDivMaker(id, img)
    }

    for (const [id, img] of [...data].entries()) {
        
        const res = await imgPromise(img)
        if (res.width > 1050 || res.height > 750) {
            $(`#box-overlay-${id}`).css("background", `red`)
            $(`#outer-box-${id}`).append(`<button class="retry-btn" id="retry-${id}">Retry</button>`)
            $(`#box-overlay-${id}`).addClass('error')
            continue;
        }
        await uploader(id, img)
    }
})



