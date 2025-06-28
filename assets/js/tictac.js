for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("TicTac");
    } else if (i % 3 === 0) {
        console.log("Tic");
    } else if (i % 5 === 0) {
        console.log("Tac");
    } else {
        console.log(i);
    }
}
