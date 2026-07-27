const API_URL = "http://localhost:3000/api";

const state = {
    user: JSON.parse(localStorage.getItem("recetarioUser")) || null,
    recipes: [],
    favorites: JSON.parse(localStorage.getItem("recetarioFavorites")) || [],
    view: "recipes"
};

const elements = {
    loginTab: document.getElementById("loginTab"),
    registerTab: document.getElementById("registerTab"),
    loginForm: document.getElementById("loginForm"),
    registerForm: document.getElementById("registerForm"),
    authMessage: document.getElementById("authMessage"),
    sessionText: document.getElementById("sessionText"),
    logoutButton: document.getElementById("logoutButton"),
    searchForm: document.getElementById("searchForm"),
    searchInput: document.getElementById("searchInput"),
    recipesMessage: document.getElementById("recipesMessage"),
    recipeGrid: document.getElementById("recipeGrid"),
    recipesViewButton: document.getElementById("recipesViewButton"),
    favoritesViewButton: document.getElementById("favoritesViewButton"),
    template: document.getElementById("recipeCardTemplate")
};

function saveUser(user) {
    state.user = user;
    localStorage.setItem("recetarioUser", JSON.stringify(user));
    renderSession();
}

function saveFavorites() {
    localStorage.setItem("recetarioFavorites", JSON.stringify(state.favorites));
}

function setAuthView(view) {
    const isLogin = view === "login";
    elements.loginForm.classList.toggle("hidden", !isLogin);
    elements.registerForm.classList.toggle("hidden", isLogin);
    elements.loginTab.classList.toggle("active", isLogin);
    elements.registerTab.classList.toggle("active", !isLogin);
    elements.authMessage.textContent = "";
}

function renderSession() {
    if (!state.user) {
        elements.sessionText.textContent = "Sin sesion";
        elements.logoutButton.classList.add("hidden");
        return;
    }

    elements.sessionText.textContent = `Hola, ${state.user.nombre}`;
    elements.logoutButton.classList.remove("hidden");
}

function normalizeRecipe(recipe) {
    return {
        id: recipe.idMeal,
        title: recipe.strMeal,
        image: recipe.strMealThumb,
        category: recipe.strCategory || "Receta de TheMealDB",
        area: recipe.strArea || "",
        source: recipe.strSource || recipe.strYoutube || "#"
    };
}

function isFavorite(recipeId) {
    return state.favorites.some((recipe) => recipe.id === recipeId);
}

function toggleFavorite(recipe) {
    if (!state.user) {
        elements.recipesMessage.textContent = "Inicia sesion para guardar favoritos.";
        return;
    }

    if (isFavorite(recipe.id)) {
        state.favorites = state.favorites.filter((item) => item.id !== recipe.id);
    } else {
        state.favorites.push(recipe);
    }

    saveFavorites();
    renderRecipes();
}

function setView(view) {
    state.view = view;
    elements.recipesViewButton.classList.toggle("active", view === "recipes");
    elements.favoritesViewButton.classList.toggle("active", view === "favorites");
    renderRecipes();
}

function renderRecipes() {
    const list = state.view === "favorites" ? state.favorites : state.recipes;
    elements.recipeGrid.innerHTML = "";

    if (list.length === 0) {
        elements.recipesMessage.textContent = state.view === "favorites"
            ? "Todavia no tienes recetas favoritas."
            : "Busca una receta para mostrar resultados.";
        return;
    }

    elements.recipesMessage.textContent = "";

    list.forEach((recipe) => {
        const card = elements.template.content.cloneNode(true);
        const image = card.querySelector(".recipe-image");
        const title = card.querySelector(".recipe-title");
        const meta = card.querySelector(".recipe-meta");
        const link = card.querySelector(".recipe-link");
        const button = card.querySelector(".favorite-button");

        image.src = recipe.image;
        image.alt = recipe.title;
        title.textContent = recipe.title;
        meta.textContent = [recipe.category, recipe.area].filter(Boolean).join(" - ");
        link.href = recipe.source;
        button.textContent = isFavorite(recipe.id) ? "★" : "☆";
        button.title = isFavorite(recipe.id) ? "Quitar de favoritos" : "Agregar a favoritos";
        button.classList.toggle("active", isFavorite(recipe.id));
        button.addEventListener("click", () => toggleFavorite(recipe));

        elements.recipeGrid.appendChild(card);
    });
}

async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        headers: {
            "Content-Type": "application/json"
        },
        ...options
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || "Ocurrio un error en la solicitud");
    }

    return data;
}

async function searchRecipes(term) {
    elements.recipesMessage.textContent = "Buscando recetas...";

    try {
        const data = await request(`/recetas/buscar/${encodeURIComponent(term)}`);
        state.recipes = (data.meals || []).map(normalizeRecipe);
        setView("recipes");
    } catch (error) {
        state.recipes = [];
        elements.recipesMessage.textContent = error.message;
        renderRecipes();
    }
}

elements.loginTab.addEventListener("click", () => setAuthView("login"));
elements.registerTab.addEventListener("click", () => setAuthView("register"));

elements.loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    elements.authMessage.textContent = "Ingresando...";

    try {
        const data = await request("/usuarios/login", {
            method: "POST",
            body: JSON.stringify({
                email: document.getElementById("loginEmail").value,
                contrasena: document.getElementById("loginPassword").value
            })
        });

        saveUser(data.usuario);
        elements.authMessage.textContent = "Inicio de sesion correcto.";
    } catch (error) {
        elements.authMessage.textContent = error.message;
    }
});

elements.registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    elements.authMessage.textContent = "Creando cuenta...";

    try {
        await request("/usuarios/register", {
            method: "POST",
            body: JSON.stringify({
                nombre: document.getElementById("registerName").value,
                apellido: document.getElementById("registerLastName").value,
                email: document.getElementById("registerEmail").value,
                contrasena: document.getElementById("registerPassword").value
            })
        });

        elements.authMessage.textContent = "Cuenta creada. Ahora puedes ingresar.";
        elements.registerForm.reset();
        setAuthView("login");
    } catch (error) {
        elements.authMessage.textContent = error.message;
    }
});



elements.logoutButton.addEventListener("click", () => {
    state.user = null;
    localStorage.removeItem("recetarioUser");
    renderSession();
    renderRecipes();
});

elements.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const term = elements.searchInput.value.trim();

    if (term) {
        searchRecipes(term);
    }
});

elements.recipesViewButton.addEventListener("click", () => setView("recipes"));
elements.favoritesViewButton.addEventListener("click", () => setView("favorites"));

renderSession();
searchRecipes(elements.searchInput.value);