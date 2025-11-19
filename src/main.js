// ============================================
// OBESITY PREDICTION FORM HANDLER - FRONTEND ONLY
// ============================================

document.addEventListener("DOMContentLoaded", function () {
    // selec form input 
    const form = document.getElementById("obesityForm");
    const resultSection = document.getElementById("resultSection");
    const resultContent = document.getElementById("resultContent");

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    // Form submission handler
    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            // Add loading state
            const submitButton = form.querySelector(".btnSubmit");
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = "⏳ Memproses...";
            submitButton.disabled = true;

            // Hide previous results
            resultSection.style.display = "none";

            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log(data);

            try {
                // Get input values for validation
                const height = parseFloat(formData.get("Height"));
                const weight = parseFloat(formData.get("Weight"));

                // Validate input
                if (!height || !weight || height <= 0 || weight <= 0) {
                    throw new Error(
                        "Tinggi dan berat badan harus diisi dengan benar",
                    );
                }
                
                // ===================================================================================
                // Send data to backend via HTTP POST
                const response = await fetch("/api/predict", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }

                const result = await response.json();
                console.log("Server response:", result);

                // Display results
                displayResults(result);
        
                // Remove loading state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;

                // Scroll to results
                setTimeout(() => {
                    resultSection.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                }, 100);
            } catch (error) {
                console.error("Error:", error);
                displayError(
                    error.message ||
                        "Terjadi kesalahan saat memproses data. Silakan coba lagi.",
                );

                // Remove loading state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // Display results function
    function displayResults(data) {
        const obesityLevels = {
            Insufficient_Weight: {
                title: "Berat Badan Kurang",
                color: "#3b82f6",
                icon: "📉",
                description:
                    "Berat badan Anda di bawah normal. Pertimbangkan untuk meningkatkan asupan nutrisi yang seimbang.",
                recommendations: [
                    "Tingkatkan asupan kalori dengan makanan bergizi",
                    "Konsumsi protein yang cukup",
                    "Lakukan olahraga untuk membangun massa otot",
                    "Konsultasi dengan ahli gizi",
                ],
            },
            Normal_Weight: {
                title: "Berat Badan Normal",
                color: "#10b981",
                icon: "✅",
                description:
                    "Selamat! Berat badan Anda dalam kategori normal dan sehat.",
                recommendations: [
                    "Pertahankan pola makan sehat",
                    "Rutin berolahraga 3-5 kali seminggu",
                    "Cukupi kebutuhan air harian",
                    "Istirahat yang cukup",
                ],
            },
            "0rmal_Weight": {
                title: "Berat Badan Normal",
                color: "#10b981",
                icon: "✅",
                description:
                    "Selamat! Berat badan Anda dalam kategori normal dan sehat.",
                recommendations: [
                    "Pertahankan pola makan sehat",
                    "Rutin berolahraga 3-5 kali seminggu",
                    "Cukupi kebutuhan air harian",
                    "Istirahat yang cukup",
                ],
            },
            Overweight_Level_I: {
                title: "Kelebihan Berat Badan Tingkat I",
                color: "#f59e0b",
                icon: "⚠️",
                description:
                    "Berat badan Anda sedikit di atas normal. Mulai perhatikan pola hidup Anda.",
                recommendations: [
                    "Kurangi makanan berkalori tinggi",
                    "Tingkatkan konsumsi sayur dan buah",
                    "Olahraga teratur minimal 30 menit/hari",
                    "Monitor asupan kalori harian",
                ],
            },
            Overweight_Level_II: {
                title: "Kelebihan Berat Badan Tingkat II",
                color: "#f59e0b",
                icon: "⚠️",
                description:
                    "Berat badan Anda cukup di atas normal. Diperlukan perhatian lebih pada gaya hidup.",
                recommendations: [
                    "Konsultasi dengan dokter atau ahli gizi",
                    "Buat program penurunan berat badan",
                    "Tingkatkan aktivitas fisik secara bertahap",
                    "Hindari makanan tinggi gula dan lemak jenuh",
                ],
            },
            Obesity_Type_I: {
                title: "Obesitas Tipe I",
                color: "#ef4444",
                icon: "🚨",
                description:
                    "Anda dalam kategori obesitas ringan. Segera ambil tindakan untuk kesehatan Anda.",
                recommendations: [
                    "Konsultasi medis segera",
                    "Program penurunan berat badan terstruktur",
                    "Cek kesehatan rutin (gula darah, kolesterol)",
                    "Dukungan psikologis jika diperlukan",
                ],
            },
            Obesity_Type_II: {
                title: "Obesitas Tipe II",
                color: "#ef4444",
                icon: "🚨",
                description:
                    "Anda dalam kategori obesitas sedang. Tindakan medis sangat disarankan.",
                recommendations: [
                    "Konsultasi dengan dokter spesialis",
                    "Program penurunan berat badan intensif",
                    "Pemeriksaan kesehatan menyeluruh",
                    "Pertimbangkan terapi medis jika diperlukan",
                ],
            },
            Obesity_Type_III: {
                title: "Obesitas Tipe III",
                color: "#dc2626",
                icon: "🆘",
                description:
                    "Anda dalam kategori obesitas berat. Perlu penanganan medis segera.",
                recommendations: [
                    "Segera konsultasi dengan dokter spesialis",
                    "Program medis intensif diperlukan",
                    "Pemeriksaan komprehensif",
                    "Pertimbangkan intervensi medis lanjutan",
                ],
            },
        };

        const level = data.prediction || data.obesity_level;
        const levelInfo = obesityLevels[level] || {
            title: level,
            color: "#6b7280",
            icon: "❓",
            description: "Hasil prediksi telah diterima.",
            recommendations: ["Konsultasi dengan profesional kesehatan"],
        };

        const bmi = data.bmi ? data.bmi.toFixed(2) : "N/A";
        const confidence = data.confidence
            ? data.confidence.toFixed(1)
            : "N/A";

        resultContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">${levelInfo.icon}</div>
                <h4 style="color: ${levelInfo.color}; font-size: 2rem; margin-bottom: 1rem;">
                    ${levelInfo.title}
                </h4>
                <p style="font-size: 1.125rem; color: var(--gray-700); line-height: 1.8;">
                    ${levelInfo.description}
                </p>
            </div>

            <div style="background-color: var(--gray-50); padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; text-align: center;">
                    <div>
                        <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.5rem;">BMI Anda</div>
                        <div style="font-size: 2rem; font-weight: 700; color: ${levelInfo.color};">${bmi}</div>
                    </div>
                    ${
                        confidence !== "N/A"
                            ? `
                    <div>
                        <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.5rem;">Tingkat Kepercayaan</div>
                        <div style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">${confidence}%</div>
                    </div>
                    `
                            : ""
                    }
                </div>
            </div>

            <div style="background-color: #fef3c7; padding: 1.5rem; border-radius: 0.75rem; border-left: 4px solid var(--accent-color);">
                <h5 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: var(--gray-900);">
                    💡 Rekomendasi untuk Anda:
                </h5>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${levelInfo.recommendations
                        .map(
                            (rec) => `
                        <li style="padding: 0.5rem 0; color: var(--gray-800); display: flex; align-items: start; gap: 0.5rem;">
                            <span style="color: var(--accent-color); font-weight: bold;">▸</span>
                            <span>${rec}</span>
                        </li>
                    `,
                        )
                        .join("")}
                </ul>
            </div>

            <div style="margin-top: 2rem; padding: 1rem; background-color: #fee2e2; border-radius: 0.75rem; text-align: center;">
                <p style="font-size: 0.875rem; color: var(--error); font-weight: 500;">
                    ⚠️ Disclaimer: Hasil ini adalah prediksi berdasarkan data yang Anda masukkan.
                    Untuk diagnosis yang akurat, silakan konsultasikan dengan dokter atau profesional kesehatan.
                </p>
            </div>
        `;

        resultSection.style.display = "block";
    }

    // Display error function
    function displayError(message) {
        resultContent.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">❌</div>
                <h4 style="color: var(--error); font-size: 1.5rem; margin-bottom: 1rem;">
                    Terjadi Kesalahan
                </h4>
                <p style="color: var(--gray-700);">${message}</p>
            </div>
        `;
        resultSection.style.display = "block";
    }

    // Form reset handler
    const resetButton = form.querySelector(".btnReset");
    if (resetButton) {
        resetButton.addEventListener("click", function () {
            resultSection.style.display = "none";
            form.reset();
        });
    }

    // Input validation helpers
    const numericInputs = form.querySelectorAll('input[type="number"]');
    numericInputs.forEach((input) => {
        input.addEventListener("input", function () {
            const min = parseFloat(this.min);
            const max = parseFloat(this.max);
            const value = parseFloat(this.value);

            if (value < min) {
                this.setCustomValidity(`Nilai minimum adalah ${min}`);
            } else if (value > max) {
                this.setCustomValidity(`Nilai maksimum adalah ${max}`);
            } else {
                this.setCustomValidity("");
            }
        });
    });

    // Add active state to nav links based on scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navLink");

    window.addEventListener("scroll", function () {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        ".aboutCard, .infoCard, .formGroup",
    );
    animatedElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });
});
