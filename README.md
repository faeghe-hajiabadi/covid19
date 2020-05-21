# Coronavirus (COVID-19) Tracker

📈 [**Coronavirus Tracker **](https://haji-covid19.netlify.app/) shows the data of Сoronavirus distribution per country and in all over the world.


### Main Functionality

This project has 3 main parts: 
1- confirmed cases in every country that has shown on map with gradiant of red color.
2-confirmed cases in all the world and in every country on chart that can show you the speed of infection. 
3-confirmed cases and death in every country on table.
also there is related links that you can find reliable websites to read more about covid19.

Here is how the main functionality looks like:

![COVID-19 Dashboard Demo](./covid.gif)

## Data source and tech-stack

The dashboard is using [COVID-19 (2019-nCoV) Data Repository by Johns Hopkins CSSE](https://github.com/CSSEGISandData/COVID-19) as a data source.

Front-end wise I've tried to make it as simple as possible, therefore the dashboard is using a pure [React.js](https://reactjs.org/) (without `JSX` transpiler or `CreateReactApp` starter). To draw the chart I've used [Charts.js](https://www.chartjs.org/).

## Terms of Use

This GitHub [repository](https://github.com/trekhleb/covid-19) and its [Dashboard](https://trekhleb.github.io/covid-19/) relies upon publicly available data from [COVID-19 (2019-nCoV) Data Repository by Johns Hopkins CSSE](https://github.com/CSSEGISandData/COVID-19) as its main data source. The author of this repository hereby disclaims any and all representations and warranties with respect to the [Website](https://trekhleb.github.io/covid-19/), including accuracy, fitness for use, and merchantability. Reliance on the [Website](https://trekhleb.github.io/covid-19/) for medical guidance or use of the Website in commerce is strictly prohibited.
