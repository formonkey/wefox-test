const getRandomListNumber = (total) => {
    const list = [];

    for (let i = 0; i < total; i++) {
        list.push(Math.round(Math.random() * total));
    }

    return list;
};

console.log(getRandomListNumber(500).sort((a, b) => a - b)[11]);
