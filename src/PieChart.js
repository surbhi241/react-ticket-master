import Chart from 'react-google-charts';
import React from 'react';

class PieChart extends React.Component {
    constructor(){
       super()
       this.state ={}
    }

    render(){
        return(
            <div>
             <Chart
                  width={'500px'}
                  height={'300px'}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Task', 'Hours per Day'],
                    ['Work', 11],
                    ['Eat', 2],
                    ['Commute', 2],
                    ['Watch TV', 2],
                    ['Sleep', 7],
                  ]}
                  options={{
                    title: 'My Daily Activities',
                    padding: '10px'
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
            </div>)
    }
}

export default Chart;