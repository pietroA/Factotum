function getRandomNumber(min, max){
    min = Math.ceil(min);
    max = Math.ceil(max);
    console.log(min, max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}
