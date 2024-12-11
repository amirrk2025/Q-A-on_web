async function generateQuestions(type) {
    const userText = document.getElementById('userText').value;

    if (!userText) {
        alert('Please enter some text.');
        return;
    }

    const endpointMap = {
        shortAnswer: 'Generate short-answer questions with answers.',
        multipleChoice: 'Generate multiple-choice questions with answers.',
        trueFalse: 'Generate true/false questions with answers.',
        fillBlank: 'Generate fill-in-the-blank questions with answers.'
    };

    const prompt = endpointMap[type];

    const response = await fetch('/generate-qa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userText, prompt })
    });

    const data = await response.json();
    const outputDiv = document.getElementById('output');
    outputDiv.classList.add('visible');
    outputDiv.innerText = data.message;

    // Optional: Scroll to the output
    outputDiv.scrollIntoView({ behavior: 'smooth' });
}

