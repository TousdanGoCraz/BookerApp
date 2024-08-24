//Fixed header

window.addEventListener('scroll', function() {
    var fixedHeader = document.getElementById('fixed-header');
    var triggerHeight = 100; // Adjust this value to set when the fixed header appears
  
    if (window.scrollY > triggerHeight) {
      fixedHeader.classList.remove('hidden');
    } else {
      fixedHeader.classList.add('hidden');
    }
  });



//Books

document.querySelector('button').addEventListener('click',getFetch)

function getFetch(){
    //user choice
    let userChoice = document.querySelector('input').value
    userChoice = userChoice.replace(' ','%20')
    let container = document.querySelector('#container')

    while (container.firstChild){
        container.removeChild(container.firstChild)
    }
    fetch(`https://gutendex.com/books?search=${userChoice}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        console.log(data.results)
        //img
        let results = data.results
        results.forEach(result => {
            console.log(result.title)

            //img for iteration
            let img = document.createElement('img')
            img.src = result.formats['image/jpeg']

            //for each iteration create a section with relevant elements inside
            let section = document.createElement('section')

            //add class to section to style with flex
            section.classList.add('section-container')
            //h3 for TITLE
            let h3 = document.createElement('h3')
            h3.textContent = result.title

            //ul element for genres
            let ul = document.createElement('ul')
            let subjects = result.subjects

            subjects.forEach(subject => {
                let li = document.createElement('li')
                li.textContent = subject
                ul.appendChild(li)
            })
            //h3 element for Writer
            let writerTitle = document.createElement('h3')
            writerTitle.textContent = 'Writer(s):'
            //ul element for Authors

            let ulAuthors = document.createElement('ul')
            let authors = result.authors

            authors.forEach(author => {
                let li = document.createElement('li')
                li.textContent = author.name
                ulAuthors.appendChild(li)
            })

            //download link
            let download = document.createElement('button')
            download.classList.add('downloadBtn')
            let anchor = document.createElement('a')
            anchor.href = result.formats['application/epub+zip']
            anchor.textContent = 'Download'
            download.appendChild(anchor)

            section.appendChild(img)
            section.appendChild(h3)
            section.appendChild(ul)
            section.appendChild(writerTitle)
            section.appendChild(ulAuthors)
            section.appendChild(download)
            document.querySelector('#container').appendChild(section)
            

        })

        //download
        document.querySelector('a').href = data.results[1].formats['application/epub+zip']
    })


}
