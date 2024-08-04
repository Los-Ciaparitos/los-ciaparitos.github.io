(function() {
    let isDevToolsOpen = false;

    const checkDevTools = function() {
        const threshold = 160;
        const widthDifference = window.outerWidth - window.innerWidth;
        const heightDifference = window.outerHeight - window.innerHeight;

        if (widthDifference > threshold || heightDifference > threshold) {
            isDevToolsOpen = true;
            window.location.href = 'https://nohello.net';
        }
    };

    window.addEventListener('resize', checkDevTools);
    setInterval(checkDevTools, 1000); 
})();

let isFormSubmitted = localStorage.getItem('isFormSubmitted') === 'true';

document.getElementById('recruitment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (isFormSubmitted) {
        alert('Formularz został już wysłany.');
        return;
    }

    const discordNick = document.getElementById('discord-nick').value;
    const uid = document.getElementById('uid').value;
    const age = document.getElementById('age').value;
    const reason = document.getElementById('reason').value;

    const data = {
        content: null,
        embeds: [
            {
                title: "Nowa aplikacja rekrutacyjna",
                fields: [
                    {
                        name: "Nick na Discord",
                        value: discordNick,
                        inline: true
                    },
                    {
                        name: "UID",
                        value: uid,
                        inline: true
                    },
                    {
                        name: "Wiek",
                        value: age,
                        inline: true
                    },
                    {
                        name: "Dlaczego ty?",
                        value: reason,
                        inline: false
                    }
                ]
            }
        ]
    };

    fetch('https://discord.com/api/webhooks/1266385945821974588/syAEwG8NfmUEpGqhDWqFoCt2s71oukfaqvaRR2TjLhvinzisYvoT_WMWDVdRTHnVHP_X', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            alert('Formularz został wysłany!');
            document.getElementById('recruitment-form').reset();
            isFormSubmitted = true;
            localStorage.setItem('isFormSubmitted', 'true');
        } else {
            alert('Wystąpił błąd przy wysyłaniu formularza.');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('Wystąpił błąd przy wysyłaniu formularza.');
    });
});
