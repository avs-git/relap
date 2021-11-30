const value = localStorage.getItem('smthKey');

if(!value) localStorage.setItem('smthKey', '12345');

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    console.log('!!!!! localStorage', {[key]: localStorage.getItem(key)});
}

window.addEventListener('message', (e)=>{
    const { data } = e;

    console.log('!!!!! data', data);

    localStorage.setItem(data.key, data.value)

    fetch('https://avs-git.github.io/relap/', {
        method: 'POST',
        body: {
            uid: 100500,
        }
    })
})

if ('serviceWorker' in navigator) {
    // Весь код регистрации у нас асинхронный.
    navigator.serviceWorker.register('./sw.js')
        .then(() => navigator.serviceWorker.ready.then((worker) => {
            worker.sync.register('syncdata');
        }))
        .catch((err) => console.log(err));
}