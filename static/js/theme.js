const playgrounds = [];

const currentTheme = localStorage.getItem("theme");
document.documentElement.setAttribute("data-theme", currentTheme);

document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
        setTheme(theme);
    } else {
        const theme = document.querySelector("html").getAttribute("data-theme");

        localStorage.setItem("theme", theme);
        setTheme(theme);
    }

    const changeThemeButton = document.querySelectorAll(".js-change-theme__action");
    changeThemeButton.forEach(button => {
        button.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            setTheme(newTheme);
        })
    });
});

function setTheme(newTheme) {
    const changeThemeButton = document.querySelector(".js-change-theme__action");
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    const svgSun = changeThemeButton.querySelector(".sun");
    const svgMoon = changeThemeButton.querySelector(".moon");
    if (newTheme === "dark") {
        svgSun.style.display = "block";
        svgMoon.style.display = "none";
    } else {
        svgSun.style.display = "none";
        svgMoon.style.display = "block";
    }

    if (playgrounds !== undefined) {
        playgrounds.forEach(playground => {
            playground.setTheme(newTheme);
        });
    }

    changeGiscusTheme(newTheme);
}

function changeGiscusTheme(theme) {
    function sendMessage(message) {
        const iframe = document.querySelector('iframe.giscus-frame');
        if (!iframe) return;
        iframe.contentWindow.postMessage({giscus: message}, 'https://giscus.app');
    }

    sendMessage({
        setConfig: {
            theme: theme
        }
    });
}
