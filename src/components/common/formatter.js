import moment from "moment";

function date2Char(row, column) {
    let date = row[column.property];
    if (date == undefined) {
        return "";
    }
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}


// 借用记录状态格式化
function borrowStatusFormat(row, column) {
    let status = row;
    let column_property = column.property;
    if (column_property.split('.').length > 0) {
        var arr = column_property.split('.');
        for (const ele of arr) {
            status = status[ele]
        }


    } else {
        status = row[column_property];
    }

    var statusW = '未知';
    switch (status) {
        case 0:
            statusW = '已创建';
            break;
        case 1:
            statusW = '已确认';
            break;
        case 2:
            statusW = '已借出';
            break;
        case 5:
            statusW = '已归还';
            break;
        case 10:
            statusW = '已关闭';
            break;
    }
    return statusW;
}

// 物品状态格式化
function goodStatusFormat(row, column) {
    let status = row;
    let column_property = column.property;
    if (column_property.split('.').length > 0) {
        var arr = column_property.split('.');
        for (const ele of arr) {
            status = status[ele]
        }


    } else {
        status = row[column_property];
    }
    var statusW = '未知';
    switch (status) {
        case 0:
            statusW = '正常';
            break;
        case 1:
            statusW = '借用中';
            break;
        case 2:
            statusW = '已借出';
            break;
    }
 
    return statusW;
}

export {
    date2Char,
    goodStatusFormat,
    borrowStatusFormat
}