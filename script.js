(function () {
    // Check if marked is available
    if (typeof marked === 'undefined') {
        console.error('Marked library not loaded');
        document.getElementById('render-target').innerHTML = '<p style="color: red; padding: 20px;">Error: components could not be loaded. Please check your internet connection.</p>';
        return;
    }

    const input = document.getElementById('markdown-input');
    const output = document.getElementById('render-target');

    // Initial default text
    const defaultText = `
# Welcome to Markdown Studio

Paste your content on the left, and see it transform into a **GitHub-styled** document on the right.

## Why this is great:
1. **Client-side only**: No data is sent to a server.
2. **PDF Support**: Click the button above to export.
3. **Clean Code**: Zero dependencies beyond the core libraries.
4. **Dark Mode**: Easy on the eyes for late night coding.

\`\`\`javascript
function helloWorld() {
  console.log("This looks great!");
}
\`\`\`

> "Markdown is the easiest way to write for the web."

---
Try pasting your own notes here!`;

    // Set initial value
    input.value = defaultText;

    // Function to update the preview
    const updatePreview = () => {
        const rawValue = input.value;
        try {
            output.innerHTML = marked.parse(rawValue);
        } catch (e) {
            console.error('Markdown parsing error:', e);
            output.innerHTML = 'Error parsing markdown';
        }
    };

    // Event listeners
    input.addEventListener('input', updatePreview);

    // Initial call
    updatePreview();

    // Expose functions to window for the button onclicks
    window.clearEditor = () => {
        input.value = '';
        updatePreview();
        input.focus();
    };

    window.exportToPDF = () => {
        const element = document.getElementById('render-target');

        // Configuration for html2pdf
        const opt = {
            margin: [0.5, 0.5],
            filename: 'markdown-export.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            console.log('PDF Downloaded');
        });
    };
})();
