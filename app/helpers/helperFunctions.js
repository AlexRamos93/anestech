const moment = require('moment');

exports.setEndDate = (date) => {
    return moment(date).format('YYYY-MM-DD 23:59:59');
};

exports.formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
};

exports.newDate = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
};
