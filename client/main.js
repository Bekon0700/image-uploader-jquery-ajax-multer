$('.submit-form').on('submit', function(e){
    e.preventDefault()
    const data = $('.img-upload')[0].files
    
    for(const [id, img] of [...data].entries()){
        console.log(id, img)
        const formData = new FormData()
        formData.append('img', img)

        $.ajax({
            type: 'POST',
            url: 'http://localhost:4500/upload-img',
            data: formData,
            contentType: false,
            xhr: function() {
                const xhr = new XMLHttpRequest()
                xhr.upload.addEventListener('progress', (e) => {
                    const {loaded, total} = e;
                    const percentage = Math.ceil(loaded / total * 100)
                    $('.box-overlay').css("height", `${percentage}px`)
                    $('.title').text(`${percentage}%`)
                    console.log(percentage)
                })
                return xhr
            },
            enctype: 'multipart/form-data',
            processData: false,
            // success: (result, status, xhr) => {
            //     console.log(result, status, xhr)
            // }
        })
    }
})


