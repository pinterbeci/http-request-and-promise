const btn = document.querySelector('#fetch-posts');
btn.addEventListener( 'click', () =>{

    let url = 'https://jsonplaceholder.typicode.com/posts';
    
    sendRequest( url, 'GET', null, (posts) =>{

        let renderedPostsInHtml = '';

        for( currentPost in posts){

            renderedPostsInHtml += `
            
                <ul> 
                    <li> ${posts[currentPost].id} </li>
                    <li> ${posts[currentPost].userId} </li>
                    <li> ${posts[currentPost].title} </li>
                    <li> ${posts[currentPost].body} </li>
                </ul>
            ` ;
        }

        document.querySelector('.post-container').innerHTML = renderedPostsInHtml;

    });
});


let sendRequest  = (url, method, body, callback) => {

    const xhr = new XMLHttpRequest;

    xhr.onreadystatechange = () =>{

        if( xhr.readyState === 4 && xhr.status === 200){

            callback(JSON.parse(xhr.responseText));
        }
    }
    
    xhr.open(method, url);
    xhr.send(body);

}


