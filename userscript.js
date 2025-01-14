// ==UserScript==
// @name         Fake Robux
// @namespace    http://tampermonkey.net/
// @version      2025-01-14
// @description  Life is roblox
// @author       https://github.com/0xSpai
// @match        https://www.roblox.com/*
// @match        http://www.roblox.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const robuxAmountText = "1.6M+";
    const robuxBalanceText = "1,653,608";

    const style = document.createElement('style');
    style.innerHTML = `
        #nav-robux-amount,
        #nav-robux-balance {
            visibility: hidden;
        }
    `;
    document.head.appendChild(style);

    function updateRobuxDisplay() {
        const robuxAmount = document.querySelector("#nav-robux-amount");
        const robuxBalance = document.querySelector("#nav-robux-balance");

        if (robuxAmount) {
            robuxAmount.textContent = robuxAmountText;
            robuxAmount.style.visibility = "visible";
        }

        if (robuxBalance) {
            robuxBalance.textContent = robuxBalanceText;
            robuxBalance.style.visibility = "visible";
        }
    }

    const observer = new MutationObserver(() => {
        updateRobuxDisplay();
    });

    const buttonContainer = document.querySelector("#navbar-robux");
    if (buttonContainer) {
        observer.observe(buttonContainer, {
            childList: true,
            subtree: true
        });
    }

    window.addEventListener("load", () => {
        updateRobuxDisplay();

        const interval = setInterval(() => {
            updateRobuxDisplay();
            if (document.querySelector("#nav-robux-amount") && document.querySelector("#nav-robux-balance")) {
                clearInterval(interval);
            }
        }, 500);
    });

})();
