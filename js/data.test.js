var albums = require('./data');

test("albums[0].title", function () {
	expect(albums[0].title).toBe("观乐亭");
});

test("albums[0].description", function () {
	expect(albums[0].description).toBe("龙溪大沙村观乐亭");
});

test("albums[0].coverUrl", function () {
	expect(albums[0].coverUrl).toBe("album/images/cover/cover(1).png");
});

/*test("albums[0].imagesUrl", function () {
	expect(albums[0].imagesUrl[0]).toBe("album/images/cover/cover(1).png");
});
*/