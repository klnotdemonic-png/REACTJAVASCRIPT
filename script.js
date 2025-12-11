function showCard() {
    const card = document.getElementById("card");
    card.classList.remove("hidden");
    startConfetti();

    // Play music setelah interaction
    const music = document.getElementById("bgm");
    music.volume = 0.4;

    music.play().catch(() => {
        // Jika browser butuh gesture dulu
        document.body.addEventListener("click", () => music.play(), { once: true });
    });
}

// ===================
// Confetti Animation
// ===================
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];

function randomColor() {
    const colors = ["#ff0055", "#ffbb00", "#00ddff", "#ff66cc", "#ffffff"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createConfettiPiece() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        color: randomColor(),
        speed: Math.random() * 3 + 2
    };
}

for (let i = 0; i < 150; i++) {
    confettiPieces.push(createConfettiPiece());
}

function startConfetti() {
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces.forEach((piece) => {
            ctx.fillStyle = piece.color;
            ctx.fillRect(piece.x, piece.y, piece.size, piece.size);

            piece.y += piece.speed;

            if (piece.y > canvas.height) {
                piece.y = -10;
                piece.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}
