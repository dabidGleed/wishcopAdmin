/**
 * ORDERS PAGE CONTROLLER
 */

app.controller('ledgerCtrl', ["$scope","ordersService", "reportsService", "$filter","$state", function ($scope, ordersAPI,reportsService, $filter, $state) {

    
    $scope.search = {
        toDate: new Date()
    };
    // get account transfers list
    $scope.getBuyerOrders = function (searchData) {
        NProgress.start();
        reportsService.getBuyerOrdersAPI(searchData).then(function (response) {
            $scope.orders = response.data;
            $scope.balance = 0;
            $scope.totalDebit = 0;
            $scope.totalCredit = 0;
            $scope.orders.unshift({
                orderDate: searchData.fromDate,
                invoiceId: "Opening Balance",
                order_total: $scope.search.buyer.openingLedgerBalance,
                credit: 0
            });
            angular.forEach($scope.orders, function(item){
                item.orderDate = new Date(item.orderDate);
            })
            $scope.orders = $filter('orderBy')($scope.orders, 'orderDate');
            angular.forEach($scope.orders, function (item) {
                console.log(item.orderDate);
                item.edited = true;
                if(!!item.credit){
                    item.credited  = true;
                }
                if(item.invoiceId != "Opening Balance"){
                    var invoiceId = item.sales[0].invoiceId? item.sales[0].invoiceId: item.sales[0].order_item_id;
                    item.invoiceId = "Bill No:" + invoiceId;
                    $scope.totalDebit +=  item.order_total;
                    $scope.balance += item.order_total;
                }else{
                    $scope.balance =  $scope.search.buyer.openingLedgerBalance;
                }
                console.log($scope.orders);
                item.balance = $scope.balance;
            });
            NProgress.done();
        });
    };
    
    ordersAPI.getBuyersList().then(function (response) {
        $scope.buyersList = [];
        if (response.data) {
            for (var i = 0; i < response.data.length; i++) {
                if (!!response.data[i].profile && !!response.data[i].profile.companyName) {
                    $scope.buyersList.push(response.data[i]);  
                }
            }
            $scope.search.selectedYear = null;
            var date = new Date();
            date.setMonth(4);
            date.setDate(31);
            date.setHours(23, 59, 59, 999);
            if (new Date().getTime() > date.getTime()) {
                $scope.search.selectedYear = {
                    year: new Date().getFullYear(),
                    yearFrom: (new Date().getFullYear()).toString() + "-" + (new Date().getFullYear() + 1).toString()
                };
            } else {
                $scope.search.selectedYear = {
                    year: new Date().getFullYear() - 1,
                    yearFrom: (new Date().getFullYear() - 1).toString() + "-" + new Date().getFullYear().toString()
                };
            }
            // $scope.search.buyer = $scope.buyersList[0];
        }
    });

    $scope.$watch("search.buyer", function () {
        console.log($scope.search.buyer);
        if (!!$scope.search.buyer) {
       
            console.log($scope.search.buyer.ledgerDetails);
            console.log($scope.search.selectedYear);
            if (!$scope.search.buyer.openingLedgerBalance) $scope.search.buyer.openingLedgerBalance = 0;
            if (!!$scope.search.buyer.ledgerDetails && $scope.search.buyer.ledgerDetails.length > 0) {
                $scope.yearsData = $filter('filter')($scope.search.buyer.ledgerDetails, {
                    yearFrom: $scope.search.selectedYear.yearFrom
                });
                if ($scope.yearsData.length > 0) {
                    $scope.ledgerdetails = $scope.search.buyer.ledgerDetails;
                    $scope.getBuyerOrders($scope.search);
                } else {
                    $scope.search.buyer.ledgerDetails.push($scope.search.selectedYear);
                    $scope.ledgerdetails = $scope.search.buyer.ledgerDetails;
                }
            } else {
                $scope.getBuyerOrders($scope.search);
                $scope.ledgerdetails = [];
                $scope.ledgerdetails.push($scope.search.selectedYear);
            }
        }else{
            $scope.ledgerdetails = [];
            $scope.search.selectedYear ={};
            $scope.orders = [];
        }
    });
    // $scope.$watch("search.fromDate", function () {
    //     if (!!$scope.search.fromDate && !!$scope.search.toDate) {
    //         $scope.getBuyerOrders($scope.search);
    //     }
    // });
    // $scope.$watch("search.toDate", function () {
    //     if (!!$scope.search.fromDate && !!$scope.search.toDate) {
    //         $scope.getBuyerOrders($scope.search);
    //     }
    // });
    $scope.$watch("search.selectedYear", function () {
        if($scope.search.selectedYear){
            var year  = $scope.search.selectedYear;
            var d = new Date();
            d.setFullYear(year.year);
            d.setMonth(3);
            d.setDate(1);
            d.setHours(0, 0, 0, 0);
            $scope.search.fromDate = d;
        }
    });
    $scope.selectLedgerPeriod = function(year){
        if (!!$scope.search.selectedYear) {
            if(!!$scope.search.buyer.ledgerDetails && $scope.search.buyer.ledgerDetails.length >0 ){
                $scope.yearsData = $filter('filter')($scope.search.buyer.ledgerDetails, {
                    yearFrom: $scope.search.selectedYear.year
                });
                if($scope.yearsData.length > 0){
                    $scope.search.selectedYear.balance = $scope.yearsData[0].balance;
                    $scope.search.selectedYear.ledgerDoc = $scope.yearsData[0].ledgerDoc;
                }
            }
            var year  = $scope.search.selectedYear;
            var d = new Date();
            d.setFullYear(year.year);
            d.setMonth(3);
            d.setDate(1);
            d.setHours(0, 0, 0, 0);
            $scope.search.fromDate = d;

            var d1 = new Date();
            d1.setFullYear(year.year + 1);
            d1.setMonth(2);
            d1.setDate(31);
            d1.setHours(23, 59, 59, 999);
            $scope.search.toDate = d1;
            $scope.getBuyerOrders($scope.search);
        } else{

        }
    }
    
    $scope.saveCredit = function (order) {
        var new_order = {
            orderDate: order.orderDate,
            invoiceId: order.invoiceId,
            order_total: null,
            credit: order.credit,
            credited : true,
            edited: true
        };
        order.credit = null;
        order.credited = true;
        $scope.orders.push(new_order);
        $scope.balance = 0;
        $scope.totalDebit = 0;
        $scope.totalCredit = 0;
        $scope.orders = $filter('orderBy')($scope.orders, 'orderDate');
        angular.forEach($scope.orders, function (item) {
            if(item.credit){
                $scope.totalCredit += item.credit;
                $scope.balance = $scope.balance - item.credit;
            }else{
                $scope.totalDebit +=  item.order_total;
                $scope.balance += item.order_total;
            }
            item.balance = Number($scope.balance.toFixed(2));
        });
        $scope.totalCredit = Number($scope.totalCredit.toFixed(2));
        $scope.totalDebit = Number($scope.totalDebit.toFixed(2));
        $scope.balance = Number($scope.balance.toFixed(2));
    };

    $scope.generateLedgerPDF = function (id) {
        NProgress.start();
        //print all vendors data
        var data = [];
        var docDefinition = {};
        data = [{
            style: 'tableExample',
            table: {
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
                headerRows: 1,
                widths: [60, 160, 80, 80 , 80],
                body: [
                    [{
                        text: 'DATE',
                        style: 'tableheader'
                    }, {
                        text: 'PARTICULARS',
                        style: 'tableheader'
                    }, {
                        text: 'DEBIT',
                        style: 'tableheader'
                    },
                    {
                        text: 'CREDIT',
                        style: 'tableheader'
                    },
                     {
                        text: 'BALANCE',
                        style: 'tableheader'
                    }]
                ]
            }
        }
        ];
        // $scope.orders = $filter('orderBy')($scope.orders, 'orderDate');
        // angular.forEach($scope.orders, function (item) {
        //     if(item.invoiceId != "Opening Balance"){
        //         $scope.totalDebit +=  item.order_total;
        //         $scope.balance += item.order_total;
        //     }
        //     item.balance = $scope.balance;
        // });
        // angular.forEach($scope.orders, function (item) {
        //     if(item.invoiceId != "Opening Balance"){
        //         if(item.credit){
        //             $scope.totalCredit += item.credit;
        //             $scope.balance = $scope.balance - item.credit;
        //         }else{
        //             $scope.totalDebit +=  item.order_total;
        //             $scope.balance += item.order_total;
        //         }
        //     }
        //     item.balance = Number($scope.balance.toFixed(2));
        // });
        $scope.pdfFilterData = JSON.parse(JSON.stringify($scope.orders));
        angular.forEach($scope.pdfFilterData, function (value, key) {
            
            value.credit = value.credit? value.credit.toString() : "";
            value.order_total = value.order_total? value.order_total.toString(): "";
            var current_datetime = new Date(value.orderDate);
            let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
            data[0].table.body.push([{
                text: formatted_date,
                style: 'title'
            }, {
                text: value.invoiceId,
                style: 'title'
            }, {
                text: value.order_total,
                style: 'title'
            }, {
                text: value.credit,
                style: 'title'
            }, {
                text: value.balance.toString(),
                style: 'title'
            }]);
        });
        
        data[0].table.body.push([{
            text: 0,
            style: 'title'
        }, {
            text: 'Total:',
            style: 'title'
        }, {
            text: $scope.totalDebit.toString(),
            style: 'title'
        }, {
            text: $scope.totalCredit.toString(),
            style: 'title'
        }, {
            text: $scope.balance.toString(),
            style: 'title'
        }]);
        docDefinition = {
            header: [{
                text: 'Ledger Account :' + $scope.search.buyer.profile.companyName,
                style: 'header'
            }],
            content: data,
            pageSize: 'A4',
            // by default we use portrait, you can change it to landscape if you wish
            pageOrientation: 'potrait',
            // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
            pageMargins: [40, 80, 40, 60],
            styles: {
                header: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 10, 0, 10],
                },
                title: {
                    italic: false,
                    alignment: 'right',
                    fontSize: 10,
                },
                tableheader: {
                    fontSize: 12,
                    alignment: 'center',
                    bold: true,
                },
                tableExample: {
                    margin: [0, 5, 0, 15],
                    alignment: 'center'
                }
            }
        };
        var pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.download(new Date().getTime() + ".pdf");
        pdfDocGenerator.getBase64((base64Data) => {
            var data = {
                year: $scope.search.selectedYear.year,
                yearFrom: $scope.search.selectedYear.yearFrom,
                openingBalance: $scope.balance,
                imgbase64: "data:application/pdf;base64,"+base64Data
            }
            reportsService.saveLedger($scope.search.buyer.id, data).then(function(result){
                if(result){
                    $scope.search.selectedYear = null;
                    $state.reload();
                }
            });
        });
        
       
        NProgress.done();
    };

    $scope.editRecord = function(item){
        item.edited = false;
    }
    $scope.saveRecord = function(item){
        item.edited = true;
    }
}]);
