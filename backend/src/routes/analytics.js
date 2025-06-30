const express = require('express');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const router = express.Router();

// Replace with your GA4 property ID and service account key file
const PROPERTY_ID = 'properties/494861621';
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: 'https://www.googletagmanager.com/gtag/js?id=G-FDWW5J3RXY',
});

router.get('/stats', async (req, res) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: PROPERTY_ID,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [
        { name: 'activeUsers' }, // Unique visitors
        { name: 'newUsers' },    // New users
        { name: 'eventCount' },  // Total events
      ],
      dimensions: [{ name: 'eventName' }],
    });

    let uniqueVisitors = 0;
    let returningVisitors = 0;
    let signupClicks = 0;
    let signupCompletes = 0;

    response.rows.forEach(row => {
      const eventName = row.dimensionValues[0].value;
      const eventCount = parseInt(row.metricValues[2].value, 10);
      if (eventName === 'signup_click') signupClicks = eventCount;
      if (eventName === 'signup_complete') signupCompletes = eventCount;
      if (eventName === 'user_engagement') uniqueVisitors = parseInt(row.metricValues[0].value, 10);
      // You may need to adjust this logic based on your GA4 setup
    });

    // Returning visitors is not a direct metric, but can be estimated or fetched with a different query
    // For now, set as 0 or implement a separate query if needed

    res.json({
      uniqueVisitors,
      returningVisitors, // Placeholder
      signupClicks,
      signupCompletes,
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

module.exports = router; 