document.addEventListener("DOMContentLoaded", () => {
    let currentPage = 1; 
    const totalPages = 20; 

    function navigateToPage(pageNumber) {
        for (let i = 1; i <= totalPages; i++) {
            const page = document.getElementById(`page${i}`);
            if (page) {
                page.style.display = (i === pageNumber) ? 'block' : 'none';
            }
        }
        currentPage = pageNumber;
        updateButtons();
    }

    function updateButtons() {
        const nextBtn = document.querySelector(`#page${currentPage} #nextBtn`);
        const prevBtn = document.querySelector(`#page${currentPage} #prevBtn`);

        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = !localStorage.getItem(`question${currentPage}_answered`);
    }

    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const textarea = e.target.querySelector("textarea[name='quiz-answer']");
            const answer = textarea.value.trim();

            const replyDiv = e.target.querySelector("#replyMessage");

            let isCorrect = answer.length >= 20;
            let replyMessage = isCorrect ? "Correct! Well done." : "Incorrect, please try again.";

            replyDiv.textContent = replyMessage;
            replyDiv.style.display = "block";
            replyDiv.style.backgroundColor = isCorrect ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)";
            replyDiv.style.color = "white";
            replyDiv.style.borderRadius = "6px";
            replyDiv.style.padding = "5px 5px 7px 5px";
            replyDiv.style.marginBottom = "10px";
            replyDiv.style.backdropFilter = "blur(5px)";
            replyDiv.style.border = isCorrect ? "1px solid rgba(0, 255, 0, 0.5)" : "1px solid rgba(255, 0, 0, 0.5)";
            replyDiv.style.boxShadow = isCorrect ? "0 4px 8px rgba(0, 255, 0, 0.2)" : "0 4px 8px rgba(255, 0, 0, 0.2)";
            
            if (isCorrect) {
                localStorage.setItem(`question${currentPage}_answered`, "correct");

                const nextBtn = document.querySelector(`#page${currentPage} #nextBtn`);
                if (nextBtn) nextBtn.disabled = false;
            }
        });

        form.addEventListener("reset", (e) => {
            const replyDiv = e.target.querySelector("#replyMessage");
            replyDiv.style.display = "none";
        });
    });

    document.querySelectorAll("#nextBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentPage < totalPages) navigateToPage(currentPage + 1);
        });
    });

    document.querySelectorAll("#prevBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentPage > 1) navigateToPage(currentPage - 1);
        });
    });

    // quiz goes brrr
    navigateToPage(currentPage);
    updateButtons();
});
