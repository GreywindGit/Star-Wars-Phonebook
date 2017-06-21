$(document).ready(function() {
    var userName = sessionStorage.getItem('username');
    if (!userName) {
        $('#btn-row').append('<div class="col-md-3 col-xs-offset-2 col-md-offset-6"> \
                              <button id="btn-login" class="btn btn-info" data-toggle="modal" data-target="#login-modal">Login</button> or \
                              <button id="btn-reg" class="btn btn-info" data-toggle="modal" data-target="#register-modal">Register</button></div>');
    }
    $('#residents-modal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        var planet = button.data('planet-name');
        var planetURL = button.data('planet-url');
        var modal = $(this);
        modal.find('.modal-row').remove();
        modal.find('.modal-title').text('Residents of ' + planet);
        $.get(planetURL, function(result) {
            var residentURLs = result['residents'];
            displayResidents(residentURLs);
        });
    })
    $('#btn-next').on('click', function() {
        var nextPage = $(this).data('next');
        $.get(nextPage, function(result) {
            var newData = result;
            changeTableData(newData);
            updatePageButtons(newData);
        });
    })
    $('#btn-prev').on('click', function() {
        var prevPage = $(this).data('previous');
        $.get(prevPage, function(result) {
            var newData = result;
            changeTableData(newData);
            updatePageButtons(newData);
        })
    })
})


function changeTableData(newData) {
    var newPlanets = newData['results'];
    $('.planet-data').remove();
    for (let i = 0; i < newPlanets.length; i++) {
        var planet = newPlanets[i];
        $("#main-table").append('<tr class="planet-data" id="data-row-' + i + '"></tr>');
        $("#data-row-" + i).append('<td>' + planet['name'] + '</td>');
        if (planet['diameter'] !== 'unknown') {
            $("#data-row-" + i).append('<td>' + Number(planet['diameter']).toLocaleString('en') + ' km </td>');
        } else {
            $("#data-row-" + i).append('<td>' + planet['diameter'] + '</td>');
        }
        $("#data-row-" + i).append('<td>' + planet['climate'] + '</td>');
        $("#data-row-" + i).append('<td>' + planet['terrain'] + '</td>');
        if (planet['surface_water'] !== 'unknown') {
            var waterSuffix = ' %';
        } else {
            var waterSuffix = '';
        }
        $("#data-row-" + i).append('<td>' + planet['surface_water'] + waterSuffix + '</td>');
        if (planet['population'] !== 'unknown') {
            if (planet['population'] > 1) {
                var populationSuffix = ' people';
            } else {
                var populationSuffix = ' person';
            }
            $("#data-row-" + i).append('<td>' + Number(planet['population']).toLocaleString('en') + populationSuffix + '</td>');
        } else {
            $("#data-row-" + i).append('<td>' + planet['population'] + '</td>');
        }
        if (planet['residents'].length === 0) {
            $("#data-row-" + i).append('<td> No known residents </td>');
        } else {
            if (planet['residents'].length > 1) {
                var residentSuffix = 's';
            } else {
                var residentSuffix = '';
            }
            $("#data-row-" + i).append('<td><button class="btn btn-default" data-toggle="modal" data-target="#residents-modal" data-planet-name="' + 
                                        planet['name'] + '" data-planet-url="' + planet['url'] + '">' + planet['residents'].length + ' resident' + 
                                        residentSuffix + '</button></td>');
        }
    }
}


function updatePageButtons(newData) {
    $('#btn-next').data('next', newData['next']);
    $('#btn-prev').data('previous', newData['previous']);
    if (!newData['next'] && !$('#btn-next').attr('disabled')) {
        $('#btn-next').attr('disabled', 'disabled');
    }
    if ($('#btn-next').attr('disabled') && newData['next']) {
        $('#btn-next').removeAttr('disabled');
    }
    if (!newData['previous'] && !$('#btn-prev').attr('disabled')) {
        $('#btn-prev').attr('disabled', 'disabled');
    }
    if ($('#btn-prev').attr('disabled') && newData['previous']) {
        $('#btn-prev').removeAttr('disabled');
    }
}


function displayResidents(residentURLs) {
    for (let i = 0; i < residentURLs.length; i++) {
        $.get(residentURLs[i], function(resident) {
            $('#modal-table').append('<tr class="modal-row" id="mtable-row-' + i +'"></tr>');
            $('#mtable-row-' + i).append('<td>' + resident['name'] + '</td>');
            $('#mtable-row-' + i).append('<td>' + resident['height'] / 100 + ' m</td>');
            $('#mtable-row-' + i).append('<td>' + resident['mass'] + (resident['mass'] === 'unknown' ? '</td>' : ' kg</td>'));
            $('#mtable-row-' + i).append('<td>' + resident['skin_color'] + '</td>');
            $('#mtable-row-' + i).append('<td>' + resident['hair_color'] + '</td>');
            $('#mtable-row-' + i).append('<td>' + resident['eye_color'] + '</td>');
            $('#mtable-row-' + i).append('<td>' + resident['birth_year'] + '</td>');
            $('#mtable-row-' + i).append('<td>' + resident['gender'] + '</td>');
        })
    }
}