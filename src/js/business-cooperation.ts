(() => {
    var options = {
        useEasing: true, 
        useGrouping: true, 
        separator: ',', 
        decimal: '.', 
    };
    var g = new CountUp('g', 0, 36, 0, 3, options);
    var u = new CountUp('u', 0, 4000000, 0, 3.5, options);
    if (!g.error) {
        g.start();
    } else {
      console.error(g.error);
    }
    if (!u.error) {
        u.start();
    } else {
      console.error(u.error);
    }
})()