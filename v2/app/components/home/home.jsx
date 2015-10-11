var React = require('react');

var HomeFactory = function(mixins) {

  return React.createClass({
    mixins: mixins,
    render: function() {

      return (
        <table className="accordion-table">
          <tr className="accordion-row">
            <td className="accordion-cell" rowSpan="10">test 1</td>
            <td className="accordion-cell" >Row 1 Col 1</td>
            <td className="accordion-cell" rowSpan="10">test 2</td>
            <td className="accordion-cell" >Row 1 Col 2</td>
          </tr>
          <tr>
            <td className="accordion-cell" >Row 2 Col 1</td>
            <td className="accordion-cell" >Row 2 Col 2</td>
          </tr>
          <tr>
            <td className="accordion-cell" >Row 3 Col 1</td>
            <td className="accordion-cell" >Row 3 Col 2</td>
          </tr>
          <tr>
            <td className="accordion-cell" >Row 4 Col 1</td>
            <td className="accordion-cell" >Row 4 Col 2</td>
          </tr>
          <tr>
            <td className="accordion-cell" >Row 5 Col 1</td>
            <td className="accordion-cell" >Row 5 Col 2</td>
          </tr>
          <tr>
            <td className="accordion-cell" >Row 6 Col 1</td>
            <td className="accordion-cell" >Row 6 Col 2</td>
          </tr>
          <tr>
            <td className="accordion-cell" >Row 7 Col 1</td>
            <td className="accordion-cell" >Row 7 Col 2</td>
          </tr>
          <tr>
            <td className="accordion-cell" >Row 8 Col 1</td>
            <td className="accordion-cell" >Row 8 Col 2</td>
          </tr>
          <tr>
            <td className="accordion-cell" >Row 9 Col 1</td>
            <td className="accordion-cell" >Row 9 Col 2</td>
          </tr>
          <tr>
            <td className="accordion-cell" >Row 10 Col 1</td>
            <td className="accordion-cell" >Row 10 Col 2</td>
          </tr>
        </table>
      );
    }
  });
}

module.exports = HomeFactory;
