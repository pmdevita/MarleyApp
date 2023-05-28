import { onMount, onDestroy } from "svelte";

export default (parentRefStore, refStore) => {
    let parentRef;
    let ref;

    let startNoteFunc = null;
    let endNoteFunc = null;
    const setStartNoteFunc = (func) => startNoteFunc = func;
    const setEndNoteFunc = (func) => endNoteFunc = func;

    const startNote = () => { if (startNoteFunc) startNoteFunc()};
    const endNote = () => { if (endNoteFunc) endNoteFunc()};

    let clicked = new Set();
    const startMouse = () => {
        clicked.add("mouse");
        startNote();
    }

    const endMouse = () => {
        clicked.delete("mouse");
        endNote();
    }

    const mouseEnter = (e) => {
        if (e.buttons === 1) {
            startMouse();
        }
    }

    const isTouchInElement = (touch) => {
        let rect = ref.getBoundingClientRect();
        return touch.clientX >= rect.left && rect.right >= touch.clientX
            && touch.clientY >= rect.top && rect.bottom >= touch.clientY;
    }


    const touch = (e) => {
        e.preventDefault();
        let wasClicked = clicked.size > 0;
        let currentTouches = new Set();
        for(let i = 0; i<e.touches.length; i++) {
            currentTouches.add(e.touches[i].identifier);
        }
        for(let i = 0; i<e.changedTouches.length; i++) {
            let touch = e.changedTouches[i];
            if (isTouchInElement(touch) && currentTouches.has(touch.identifier)) {
                clicked.add(touch.identifier);
            } else {
                clicked.delete(touch.identifier);
            }
        }


        if (clicked.size > 0) {
            if (wasClicked) {
                return;
            }
            startNote(e);
        }
    }

    const registerEvents = (ref, parentRef) => {
        if (ref === undefined) {
            return;
        }

        ref.addEventListener("mousedown", startMouse);
        ref.addEventListener("mouseup", endMouse);
        ref.addEventListener("mouseenter", mouseEnter);
        ref.addEventListener("mouseleave", endMouse);

        if (parentRef === undefined) {
            return;
        }

        parentRef.addEventListener("touchstart", touch);
        parentRef.addEventListener("touchmove", touch);
        parentRef.addEventListener("touchend", touch);
    }

    const unregisterEvents = (ref, parentRef) => {
        if (ref !== undefined) {
            ref.removeEventListener("mousedown", startMouse);
            ref.removeEventListener("mouseup", endMouse);
            ref.removeEventListener("mouseenter", mouseEnter);
            ref.removeEventListener("mouseleave", endMouse);
        }

        if (parentRef !== undefined) {
            parentRef.removeEventListener("touchstart", touch);
            parentRef.removeEventListener("touchmove", touch);
            parentRef.removeEventListener("touchend", touch);
        }
    }


    onMount(() => {
        registerEvents(ref, parentRef);
    });

    onDestroy(() => {
        unregisterEvents(ref, parentRef);
    })

    registerEvents(parentRef, ref);


    parentRefStore.subscribe((value) => {
        unregisterEvents(ref, parentRef);
        parentRef = value;
        registerEvents(ref, parentRef);
    })
    refStore.subscribe((value) => {
        unregisterEvents(ref, parentRef);
        ref = value;
        registerEvents(ref, parentRef);
    })



    return [setStartNoteFunc, setEndNoteFunc, clicked];
}