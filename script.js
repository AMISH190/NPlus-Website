// ==========================================
// CONFIGURATION
// ==========================================
// Update this single variable to change the download destination across the entire site.
const NPLUS_GITHUB_RELEASE = "https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/releases/latest";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Assign Download Links
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(btn => {
        if(btn.tagName === 'A') {
            btn.href = NPLUS_GITHUB_RELEASE;
        } else if (btn.tagName === 'BUTTON') {
            btn.addEventListener('click', () => {
                window.location.href = NPLUS_GITHUB_RELEASE;
            });
        }
    });

    // 2. Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(section => {
        observer.observe(section);
    });

    // 3. Copy to Clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const panel = e.target.parentElement;
            const code = panel.querySelector('code').innerText;
            
            navigator.clipboard.writeText(code).then(() => {
                const originalText = e.target.innerText;
                e.target.innerText = "Copied!";
                e.target.style.color = "white";
                e.target.style.borderColor = "var(--primary)";
                
                setTimeout(() => {
                    e.target.innerText = originalText;
                    e.target.style.color = "";
                    e.target.style.borderColor = "";
                }, 2000);
            });
        });
    });
});

// 4. Tab Switching Logic (Global function for onclick attributes)
window.openTab = function(tabId) {
    // Hide all panels
    const panels = document.querySelectorAll('.code-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
        panel.style.display = 'none';
    });

    // Remove active state from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected panel
    const targetPanel = document.getElementById(tabId);
    if(targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.style.display = 'block';
    }

    // Set active state on clicked button
    const clickedButton = document.querySelector(`.tab-btn[onclick="openTab('${tabId}')"]`);
    if(clickedButton) {
        clickedButton.classList.add('active');
    }
};