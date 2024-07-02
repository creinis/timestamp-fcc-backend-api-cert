module.exports = (req, res) => {
    const dateString = req.params.date;
    let date;
  
    if (!dateString) {
      date = new Date();
    } else {
      if (!isNaN(dateString)) {
        date = new Date(parseInt(dateString));
      } else {
        date = new Date(dateString);
      }
    }
  
    if (date.toString() === 'Invalid Date') {
      res.json({ error: 'Invalid Date' });
    } else {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
    }
  };
  