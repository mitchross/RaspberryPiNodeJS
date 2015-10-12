var garageOpener = angular.module('garageOpener', []);

function mainController( $scope , $http )
{
    $scope.openDoor = function ()
    {
        $http.post("/api/garage/openclose", {})
            .success( function(data)
            {
                console.log("OK")
            })
            .error(function(data)
            {
                console.log("Error posting");
            });
    }
}

