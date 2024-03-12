document.getElementById('new-post)').addEventListener('submit', async function(event) {
    event.preventDefault();
    const post_title = document.getElementById('title').value
    const post_content = document.getElementById('post').value
    console.log(post_title, post_text)
    if (post_text) {
        const response = await fetch('api/posts', {
            method: 'POST',
            body: JSON.stringify({post_title, post_content}),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert('Failed to create post');
        }
    }
});