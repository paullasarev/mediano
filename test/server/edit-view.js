var cheerio = require('cheerio');
var fs = require('fs');
var expect = require('chai').expect;
var util = require('util');


describe('Unit: EditView', function() {
	var viewContent = fs.readFileSync('app/partials/edit.html', {encoding:'utf8'});
 	var viewQuery = cheerio.load(viewContent);
 	// var cssContent = fs.readFileSync('public/css/app.css', {encoding:'utf8'});
 	var cssContent = fs.readFileSync('app/css/app.less', {encoding:'utf8'});
 	// cssContent = 'body {color: black} #contentText {color:red} a {color: blue} ';


	beforeEach(function() {
	});

	var findSelector = function (ccsomObject, selector) {
		var rules = ccsomObject.stylesheet.rules;
		for (var i = rules.length - 1; i >= 0; i--) {
			if (rules[i].selectorText == selector) {
				return rules[i].style;
			}
		};

		return null;
	};

 	it('should have save/cancel buttons with ng-click binding', function() {
 		expect(viewQuery('#saveButton').attr('ng-click')).to.equal('SavePage()'); 
 		expect(viewQuery('#cancelButton').attr('ng-click')).to.equal('CancelPage()');
	});

 	it('should have content binding', function() {
 		expect(viewQuery('#contentText').attr('ng-model')).to.equal('content');
 		expect(viewQuery('#contentText').attr('ng-model')).to.equal('content');
	});

 	it('should contain CSS rule', function() {
 		var re = /#contentText[ \t]*{[^}]*}/m;
 		var pos = cssContent.search(re); 
 		console.log('pos: ', pos);
 		expect(pos>=0).to.be.ok;
 		var text = cssContent.substr(pos).match(re)[0];
 		console.log(util.inspect(text ,{depth:11}));

	});
 });
