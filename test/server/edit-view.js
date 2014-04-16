var cheerio = require('cheerio');
var fs = require('fs');
var expect = require('chai').expect;

describe('Unit: EditView', function() {
	var content = fs.readFileSync('app/partials/edit.html', {encoding:'utf8'});
 	var $ = cheerio.load(content);

	beforeEach(function() {
	});

 	it('should have save/cancel buttons with ng-click binding', function() {
 		expect($('#saveButton').attr('ng-click')).to.equal('SavePage()'); 
 		expect($('#cancelButton').attr('ng-click')).to.equal('CancelPage()');
	});

 });
