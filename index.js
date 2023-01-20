var SolutionKind;
(function (SolutionKind) {
    SolutionKind[SolutionKind["Point"] = 0] = "Point";
    SolutionKind[SolutionKind["Parallel"] = 1] = "Parallel";
    SolutionKind[SolutionKind["Same"] = 2] = "Same"; // Both lines are the same
})(SolutionKind || (SolutionKind = {}));
var k1 = document.getElementById("input-k1");
var c1 = document.getElementById("input-c1");
var k2 = document.getElementById("input-k2");
var c2 = document.getElementById("input-c2");
var result = document.getElementById("result");
function toNotNaN(n) {
    return isNaN(n) ? 0 : n;
}
function getInputs() {
    return {
        k1: toNotNaN(k1.valueAsNumber), c1: toNotNaN(c1.valueAsNumber),
        k2: toNotNaN(k2.valueAsNumber), c2: toNotNaN(c2.valueAsNumber)
    };
}
function getProblemSolution(problem) {
    if (problem.k1 == problem.k2 && problem.c1 == problem.c2)
        return { kind: SolutionKind.Same };
    else if (problem.k1 == problem.k2)
        return { kind: SolutionKind.Parallel };
    else if (problem.c1 == problem.c2)
        return { kind: SolutionKind.Point, value: [0, problem.c1] };
    else {
        var x = -(problem.c1 - problem.c2) / (problem.k1 - problem.k2);
        var y = problem.k1 * x + problem.c1;
        return { kind: SolutionKind.Point, value: [x, y] };
    }
}
function run(e) {
    var input = getInputs();
    console.log("Recomputing for new input", input);
    var solution = getProblemSolution(input);
    switch (solution.kind) {
        case SolutionKind.Point:
            result.innerText = "The lines will intersect at (".concat(solution.value[0], ", ").concat(solution.value[1], ")");
            break;
        case SolutionKind.Parallel:
            result.innerText = "Lines are parallel";
            break;
        case SolutionKind.Same:
            result.innerText = "Two lines are the same";
            break;
        default:
            console.error("Not implemented SolutionKind: ".concat(solution.kind));
    }
}
function prepareInput() {
    [k1, c1, k2, c2].forEach(function (elem) { return elem.addEventListener("change", run); });
}
prepareInput();
run(null);
