interface Problem {
    readonly k1: number;
    readonly c1: number;
    readonly k2: number;
    readonly c2: number;
}

enum SolutionKind {
    Point, // The lines have one intersection point
    Parallel, // The lines are parallel
    Same // Both lines are the same
}

type Vector2 = [number, number]

interface Solution {
    readonly kind: SolutionKind,
    readonly value?: Vector2
}

const k1 = document.getElementById("input-k1") as HTMLInputElement;
const c1 = document.getElementById("input-c1") as HTMLInputElement;
const k2 = document.getElementById("input-k2") as HTMLInputElement;
const c2 = document.getElementById("input-c2") as HTMLInputElement;

const result = document.getElementById("result") as HTMLSpanElement;

function toNotNaN(n: number) {
    return isNaN(n) ? 0 : n;
}

function getInputs(): Problem {
    return {
        k1: toNotNaN(k1.valueAsNumber), c1: toNotNaN(c1.valueAsNumber),
        k2: toNotNaN(k2.valueAsNumber), c2: toNotNaN(c2.valueAsNumber),
    };
}

function getProblemSolution(problem: Problem): Solution {
    if (problem.k1 == problem.k2 && problem.c1 == problem.c2)
        return { kind: SolutionKind.Same };
    else if (problem.k1 == problem.k2) 
        return { kind: SolutionKind.Parallel };
    else if (problem.c1 == problem.c2)
        return { kind: SolutionKind.Point, value: [0, problem.c1] };
    else {
        let x = -(problem.c1 - problem.c2) / (problem.k1 - problem.k2);
        let y = problem.k1 * x + problem.c1;
        return { kind: SolutionKind.Point, value: [x, y] };
    }
}

function run(e) {
    let input = getInputs();
    console.log("Recomputing for new input", input);
    let solution = getProblemSolution(input); 
    switch (solution.kind) {
        case SolutionKind.Point:
            result.innerText = `The lines will intersect at (${solution.value![0]}, ${solution.value![1]})`;
            break;
        case SolutionKind.Parallel:
            result.innerText = "Lines are parallel";
            break;
        case SolutionKind.Same:
            result.innerText = "Two lines are the same";
            break;
        default:
            console.error(`Not implemented SolutionKind: ${solution.kind}`);
    }
}

function prepareInput() {
    [k1, c1, k2, c2].forEach(elem => elem.addEventListener("change", run))
}

prepareInput();
run(null);