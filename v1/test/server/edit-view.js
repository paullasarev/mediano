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
 		expect(viewQuery('#contentText').attr('ng-change')).to.equal('Changed()');
 		expect(viewQuery('#contentText').is('.msd-elastic')).to.be.ok;
	});

 	it('should have html binding', function() {
 		expect(viewQuery('#contentHtml').attr('ng-bind-html')).to.equal('html');
 	});

 	it('should contain CSS rule', function() {
 		var re = /#contentText[ \t]*{[^}]*}/m;
 		var pos = cssContent.search(re); 
 		// console.log('pos: ', pos);
 		expect(pos>=0).to.be.ok;
 		var text = cssContent.substr(pos).match(re)[0];
 		// console.log(util.inspect(text ,{depth:11}));

	});

 	it('should have toolbar binding', function() {
    expect(viewQuery('button[ng-click="toolH2()"]').is('button')).to.be.ok;
 		expect(viewQuery('button[ng-click="toolH3()"]').is('button')).to.be.ok;
    expect(viewQuery('button[ng-click="toolH4()"]').is('button')).to.be.ok;
 		expect(viewQuery('button[ng-click="toolUL()"]').is('button')).to.be.ok;
 		expect(viewQuery('button[ng-click="toolOL()"]').is('button')).to.be.ok;
 		expect(viewQuery('button[ng-click="toolB()"]').is('button')).to.be.ok;
 		expect(viewQuery('button[ng-click="toolI()"]').is('button')).to.be.ok;
 		expect(viewQuery('button[ng-click="toolLNK()"]').is('button')).to.be.ok;
 		expect(viewQuery('button[ng-click="toolHREF()"]').is('button')).to.be.ok;
 		expect(viewQuery('button[ng-click="toolIMG()"]').is('button')).to.be.ok;
 		expect(viewQuery('button[ng-click="toolCOD()"]').is('button')).to.be.ok;
 		expect(viewQuery('button[ng-click="toolCIT()"]').is('button')).to.be.ok;
 		expect(viewQuery('button[ng-click="toolTBL()"]').is('button')).to.be.ok;
    expect(viewQuery('button[ng-click="toolHR()"]').is('button')).to.be.ok;
	});

 });
