/**
 * 获取期数对应的小时和分钟等具体时间
 * @param {number} num 传入的期数
 */
function getTimeFromStage(num) {
    var allTime = num * 10;
    var hour = Math.floor(allTime / 60)+9;
    var minute = allTime % 60;
    return { hour, minute };
}

module.exports = {
    getTimeFromStage,
};