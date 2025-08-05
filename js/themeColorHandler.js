//Importar variáveis de mudança de tema

import { darkModeIco, darkModeBtn, lightModeIco, lightModeBtn, tasksdashboardTitle, themeColorToggleArea, tasksDashboardArea, darkModeDot, lightModeDot } from './domElements.js';

//Cores
const whiteColor = "#f3f3f3";
const blackColor = "#161515";
const orangeColor = "#e8a410ff";
const purpleColor = "#4819ac";
const blueColor = "#3B82F6";

//Função para ativar modo escuro
export const setDarkModeTheme = () => {
    document.body.style.backgroundColor = blackColor;

    tasksdashboardTitle.style.color = whiteColor;

    darkModeDot.classList.add('dark-mode-animation-active');

    darkModeIco.style.color = blueColor;

    darkModeIco.style.opacity = 1;

    darkModeBtn.style.color = whiteColor;

    darkModeIco.style.display = "block";
    darkModeDot.style.display = "block";

    lightModeIco.style.display = "none";
    lightModeDot.style.display = "none";

    darkModeIco.classList.add('dark-mode-animation-active');

    lightModeIco.classList.remove('light-mode-animation-active');

    lightModeBtn.style.color = whiteColor;

    themeColorToggleArea.style.border = `2px solid ${whiteColor}`;

    tasksDashboardArea.style.backgroundColor = purpleColor;
}

//Função para ativar modo claro
export const setLightModeTheme = () => {
    document.body.style.backgroundColor = whiteColor;

    tasksdashboardTitle.style.color = blackColor;

    darkModeDot.classList.remove('dark-mode-animation-active');

    darkModeDot.style.display = "none";
    darkModeIco.style.display = "none";

    darkModeIco.classList.remove('dark-mode-animation-active');

    lightModeIco.classList.add('light-mode-animation-active');

    lightModeIco.style.display = "block";

    darkModeBtn.style.color = blackColor;

    lightModeIco.style.color = orangeColor;

    lightModeBtn.style.color = blackColor;
    lightModeDot.style.display = "block";

    lightModeBtn.style.borderBottom = `1px solid ${blackColor}`;

    themeColorToggleArea.style.border = `2px solid ${blackColor}`;

    tasksDashboardArea.style.backgroundColor = blueColor;
}