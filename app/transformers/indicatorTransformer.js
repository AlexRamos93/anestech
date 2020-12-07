exports.avgTasksTransformer = (data) => {
    return data.map((t) => {
        return {
            user_id: t.id,
            name: t.name,
            avg: t.finished_total / t.total,
        };
    });
};

exports.avgTimeTransformer = (avg) => {
    return { average_time: parseInt(avg.average_time) };
};
