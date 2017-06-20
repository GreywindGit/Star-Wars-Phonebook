$(document).ready(function() {
    $('#residents-modal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        var planet = button.data('planet-name');
        var modal = $(this);
        modal.find('.modal-title').text('Residents of ' + planet);
        modal.find('.modal-body').text('Here comes some information about residents of ' + planet); 
    })
})