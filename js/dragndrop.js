// @ts-check

class Vector2 {
    constructor(x, y) {
        if(x instanceof Object && 'left' in x && 'top' in x) {
            this.x = x.left;
            this.y = x.top;

            return this;
        }

        this.x = x || 0;
        this.y = y || 0;
    }

    add(vec) {
        this.x += vec.x;
        this.y += vec.y;

        return this;
    }

    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;

        return this;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }
}

class DraggableList {
    /**
     * @param {(HTMLUListElement|HTMLOListElement)} lista
     */
    constructor(lista) {
        this.elemento = lista;

        /** @type {HTMLLIElement?} */
        this._itemAtivo = null;
        /** @type {Vector2} */
        this._touchLocation = new Vector2();
        /** @type {number} */
        this._displacement = 0;
        /** @type {*} */
        this._closest = null;

        this._registerEvents();
    }

    _registerEvents() {
        this.elemento.addEventListener("mousedown",  this._onMouseDown.bind(this), {passive: false});
        this.elemento.addEventListener("touchstart", this._onMouseDown.bind(this), {passive: false});

        window.addEventListener("mousemove", this._onMouseMove.bind(this), {passive: false});
        window.addEventListener("touchmove", this._onMouseMove.bind(this), {passive: false});

        window.addEventListener("mouseup",  this._onMouseUp.bind(this));
        window.addEventListener("touchend", this._onMouseUp.bind(this));

        return this;
    }

    _onMouseDown(e) {
        // Cancelando se lista tem 1 ou menos itens
        if(this.elemento.childNodes.length <= 1)
            return;

        // Desselecionando item anteriormente selecionado (possível em teclas multi-toque)
        if(this._itemAtivo)
            this._onMouseUp();

        // Verificando se o usuário clicou no item mesmo (cancelar se em outro elemento dentro do item (tipo o botão))
        const li = e.target;
        if(!(li instanceof HTMLLIElement))
            return;

        if(e.cancelable)
            e.preventDefault();

        this._itemAtivo     = li;
        this._touchLocation = new Vector2(e.clientX, e.clientY);
        this._itemLocation  = new Vector2(li.getBoundingClientRect());
        this._displacement  = li.offsetHeight + parseInt(window.getComputedStyle(li).marginTop, 10) + parseInt(window.getComputedStyle(li).marginBottom, 10);

        li.style.width    = li.clientWidth + "px";
        li.style.zIndex   = "99999999999";
        li.style.position = "fixed";
        li.parentElement.removeChild(li);
        document.body.appendChild(li);

        this._onMouseMove(e);
    }

    _onMouseMove(e) {
        if(!this._itemAtivo)
            return;

        if(e.cancelable)
            e.preventDefault();

        // Atualizando coordenadas
        const delta = new Vector2(e.clientX, e.clientY).sub(this._touchLocation);
        const style = this._itemAtivo.style;

        const pos  = this._itemLocation.clone().add(delta);

        style.top  = pos.y + "px";
        style.left = pos.x + "px";

        // Movendo o espaço em branco
        // Tirando o espaço antigo
        if(this._closest)
            this._closest.style.marginBottom = null;
        this.elemento.style.paddingTop = null;

        // Colocando o espaço novo
        this._closest = [...this.elemento.childNodes]
            .filter(el => el instanceof HTMLLIElement)
            .reduce((a, li) => li.getBoundingClientRect().top < pos.y ? li : a, null);

        if(this._closest) {
            const currentMargin = parseInt(window.getComputedStyle(this._closest).marginBottom, 10);
            this._closest.style.marginBottom = (currentMargin + this._displacement) + "px";
        } else {
            this.elemento.style.paddingTop = this._displacement + "px";
        }
    }

    _onMouseUp() {
        if(!this._itemAtivo)
            return;

        // Colocando o item de volta
        if(this._closest) if(this._closest.nextElementSibling)
            this.elemento.insertBefore(this._itemAtivo, this._closest.nextElementSibling);
        else
            this.elemento.appendChild(this._itemAtivo);
        else
            this.elemento.insertBefore(this._itemAtivo, this.elemento.firstChild);

        // Resetando
        if(this._closest)
            this._closest.style.marginBottom = null;
        this.elemento.style.paddingTop = null;
        this._itemAtivo.style.position = null;
        this._itemAtivo.style.zIndex   = null;
        this._itemAtivo.style.top      = null;
        this._itemAtivo.style.left     = null;
        this._itemAtivo.style.width    = null;
        this._itemAtivo = null;
    }
}
