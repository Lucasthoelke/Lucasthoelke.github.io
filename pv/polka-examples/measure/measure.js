export const measure = (application, buttonStop, buttonStart, buttonClear, showSegments, clearPrevious, type) => {

    const measure = application.measure;

    buttonStop.addEventListener('click', () => {
        measure.stopDraw();
    });

    buttonStart.addEventListener('click', () => {
        measure.startDraw();
    });

    buttonClear.addEventListener('click', () => {
        measure.clear();
    });

    showSegments.addEventListener('change', () => {
        measure.setShowSegments(event.target.checked);
    });

    clearPrevious.addEventListener('change', () => {
        measure.setClearPrevious(event.target.checked);
    });

    type.addEventListener('change', (event) => {
        measure.setType(event.target.value);
    });


};
