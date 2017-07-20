function editarProdutoController($scope, $http, $cookieStore, focus, $timeout, meuServico) {

    $scope.editar = function() {

        // cria um vetor vazio para armazenar o cliente e veiculos.
       var listaProduto  = [];
        listaProduto.push($scope.produto);
          
        console.log($scope.produto);

        var request = $http({
            method: "post",
            url: "php/produto/editarproduto.php",
            data: listaProduto,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        request.then(function(response) {
            var $resposta = response.data;
            console.log($resposta);
            $scope.produto = null;
            
            if ($resposta.status === true) {
               // alert('Produto  Atualizado com sucesso!');
                 meuServico.mostrar('Alteração','Registro alterado com Sucesso!!!');
                //Mandar para outra página.
                clickOnUpload();

            }
        }, function(response) {
            console.log("ERROR" + response);
        });
    }

    $scope.doSomething = function() {
        // do something awesome
        focus('nome');
         

    };

    var request = $http({
        method: "post",
        url: "php/produto/pesquisarprodutoid.php",
        data: $cookieStore.get('editarproduto'),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    /* Successful HTTP post request or not */
    request.then(function(response) {
        //console.log(response.data[0]);

        $timeout(function() {
            $scope.$apply(function() {
             
                $scope.produto = response.data[0];
                $scope.doSomething();


            });
        }, 0);
        // console.log(response.data[0].nome);

    }, function(response) {
        console.log("ERROR" + response);
    });
    $scope.teste = function() {
        console.log($cookieStore.get('editarproduto'));
    }
 
   

    function clickOnUpload() {
        $timeout(function() {
            angular.element('#voltar').triggerHandler('click');
        });
    };

    // Using Angular Extend
    angular.extend($scope, {
        clickOnUpload: clickOnUpload
    });

    // OR Using scope directly
    $scope.clickOnUpload = clickOnUpload;
 
}






angular
    .module('home')
    .factory('focus', function($timeout, $window) {
        return function(id) {
            // timeout makes sure that is invoked after any other event has been triggered.
            // e.g. click events that need to run before the focus or
            // inputs elements that are in a disabled state but are enabled when those events
            // are triggered.
            $timeout(function() {
                var element = $window.document.getElementById(id);
                if (element)
                    element.focus();
            });
        };
    })

.directive('eventFocus', function(focus) {
        return function(scope, elem, attr) {
            elem.on(attr.eventFocus, function() {
                focus(attr.eventFocusId);
            });

            // Removes bound events in the element itself
            // when the scope is destroyed
            scope.$on('$destroy', function() {
                element.off(attr.eventFocus);
            });
        };
    })
    .controller('editarProdutoController', editarProdutoController);