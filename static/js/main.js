$(document).ready(function() {
    $('#residents-modal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        var planet = button.data('planet-name');
        var modal = $(this);
        // get planet url for a get request that returns the planet belonging to the button -
        // then I can loop through the planet['residents'] array to get residents' data
        modal.find('.modal-title').text('Residents of ' + planet);
        modal.find('.modal-body').text('Here comes some information about residents of ' + planet); 
    })
    $('#btn-next').on('click', function() {
        var nextPage = $(this).data('next');
        $.get(nextPage, function(result) {
            var newData = result;
            changeTableData(newData);
        });
    })
    $('#btn-prev').on('click', function() {
        var prevPage = $(this).data('previous');
        $.get(prevPage, function(result) {
            var newData = result;
            changeTableData(newData);
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
                                        planet['name'] + '">' + planet['residents'].length + ' resident' + residentSuffix + '</button></td>');
        }
    }
    
    $('#btn-next').data('next', newData['next']);
    if (!newData['next']) {
        $('#btn-next').attr('disabled', 'disabled');
    } else {
        $('#btn-next').removeAttr('disabled');
    }
    $('#btn-prev').data('previous', newData['previous']);
    if (!newData['previous']) {
        $('#btn-prev').attr('disabled', 'disabled');
    } else {
        $('#btn-prev').removeAttr('disabled');
    }
}