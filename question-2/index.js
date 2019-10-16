const text = process.argv.slice(2).join(' ') || 'Race car';

const isPalindrome = (str) => {
    const replace = /[^A-Za-z0-9]/g;

    str = str.toLowerCase().replace(replace, '');

    const len = str.length;

    for (let i = 0; i < len/2; i++) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
    }

    return true;
};

console.log(`${ text } is a palindrome: ${ isPalindrome(text) }`);
