export function capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

const isChromium = window.chrome;
const winNav = window.navigator;
const vendorName = winNav.vendor;
const isOpera = typeof window.opr !== 'undefined';
const isIEedge = winNav.userAgent.indexOf('Edge') > -1;
const isIOSChrome = winNav.userAgent.match('CriOS');

export function isChrome() {
    if (isIOSChrome) {
        return true;
    } else if (
        isChromium !== null &&
        typeof isChromium !== 'undefined' &&
        vendorName === 'Google Inc.' &&
        isOpera === false &&
        isIEedge === false
    ) {
        return true;
    } else {
        return false;
    }
}

// Function to keep chat box at the bottom
export function scrollToBot(id) {
    const divToScrollTo = document.getElementById(id);
    if (divToScrollTo) {
        let amountToScroll = document.getElementById(id).scrollHeight;
        divToScrollTo.scrollBy({
            top: amountToScroll + 1000,
            left: 0,
            behavior: 'smooth'
        });
    }
}
