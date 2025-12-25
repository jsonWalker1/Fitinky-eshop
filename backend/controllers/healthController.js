/**
 * Controller pro health check
 */

export const getHealth = (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
};

