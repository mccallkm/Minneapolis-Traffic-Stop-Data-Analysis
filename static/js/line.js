$(document).ready(function () {
    // prepare the data
    var source =
    {
        datatype: "tab",
        datafields: [
            { name: 'responseYear' },
            { name: '' },
            { name: '' },
            { name: '' },
            { name: '' }
        ],
        url: '../'
    };

    var dataAdapter = new $.jqx.dataAdapter(source, { async: false, autoBind: true, loadError: function (xhr, status, error) { alert('Error loading "' + source.url + '" : ' + error); } });
       
    // prepare jqxChart settings
    var settings = {
        title: "Minneapolis Police Traffic Stops",
        description: "Source: ",
        enableAnimations: true,
        showLegend: true,
        padding: { left: 15, top: 5, right: 20, bottom: 5 },
        titlePadding: { left: 10, top: 0, right: 0, bottom: 10 },
        source: dataAdapter,
        xAxis:
            {
                dataField: 'Year',
                minValue: 2016,
                maxValue: 2017,
                unitInterval: 5,
                valuesOnTicks: true
            },
        colorScheme: 'scheme05',
        seriesGroups:
            [
                {
                    alignEndPointsWithIntervals: false,
                    type: 'splinearea',
                    valueAxis:
                    {
                        visible: true,
                        unitInterval: 20,
                        title: {text: 'Index Value'},
                        labels: {
                            horizontalAlignment: 'right',
                            formatSettings: {decimalPlaces: 0}
                        }
                    },
                    series: [
                            { dataField:  opacity: 0.7 },
                            { dataField: , opacity: 0.9 }
                        ]
                },
                {
                    type: 'spline',
                    alignEndPointsWithIntervals: false,
                    valueAxis:
                    {
                        title: {text: 'Interest Rate'},
                        position: 'right',
                        unitInterval: 0.01,
                        maxValue: 0.2,
                        labels: {formatSettings: { decimalPlaces: 2}},
                        tickMarks: {
                            visible: true,
                            interval: 0.005,
                        },
                        gridLines: {
                            visible: false,
                            interval: 0.01
                        }
                    },
                    series: [
                            { dataField: opacity: 1.0, lineWidth: 4, dashStyle: '4,4' }
                        ]
                }
            ]
    };

    // setup the chart
    $('#chartContainer').jqxChart(settings);

});
