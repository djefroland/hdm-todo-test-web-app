
    ### Explications sur les choix, décisions et points d'arrêt rencontrés dans le projet (Frontend)

#### Choix et décisions

1. **Gestion de l'état avec `useState` et `useEffect`** :
   - **Choix** : J'ai utilisé les hooks `useState` et `useEffect` de React pour gérer l'état local et les effets secondaires.
   - **Décision** : Utiliser `useState` pour gérer les tâches, le nom de la nouvelle tâche, et les notifications. Utiliser `useEffect` pour récupérer les tâches lors du montage du composant.

2. **Gestion des tâches avec des fonctions asynchrones** :
   - **Choix** : J'ai choisi d'utiliser des fonctions asynchrones pour gérer les opérations CRUD (Create, Read, Update, Delete) sur les tâches.
   - **Décision** : Créer des fonctions `handleFetchTasks`, `handleDelete`, `handleSave`, et `handleAdd` pour interagir avec l'API et mettre à jour l'état local en conséquence.

   - **handleFetchTasks** : Cette fonction est utilisée pour récupérer la liste des tâches depuis l'API et mettre à jour l'état `tasks`. Elle est appelée lors du montage du composant grâce à `useEffect` et après chaque opération de modification des tâches pour s'assurer que l'interface utilisateur est toujours à jour.
   
   - **handleDelete** : Cette fonction prend un `id` de tâche en paramètre, envoie une requête DELETE à l'API pour supprimer la tâche correspondante, puis appelle `handleFetchTasks` pour rafraîchir la liste des tâches. 
   
   - **handleSave** : Cette fonction prend une tâche en paramètre, vérifie que le nom de la tâche n'est pas vide, envoie une requête PATCH à l'API pour mettre à jour la tâche, puis appelle `handleFetchTasks` pour rafraîchir la liste des tâches. 
   
   - **handleAdd** : Cette fonction vérifie que le nom de la nouvelle tâche n'est pas vide, envoie une requête POST à l'API pour ajouter la nouvelle tâche, puis appelle `handleFetchTasks` pour rafraîchir la liste des tâches. Elle réinitialise également l'état `newTaskName` et met à jour l'état `notification` pour afficher un message de confirmation d'ajout.

4. **Affichage des notifications** :
   - **Choix** : J'ai choisi d'utiliser le composant `Snackbar` de Material-UI pour afficher des notifications lorsque des actions sont effectuées (ajout, mise à jour, suppression de tâches).
   - **Décision** : Mettre à jour l'état `notification` avec le message approprié et afficher le `Snackbar` lorsque cet état est défini.

#### Points d'arrêt et difficultés rencontrées

1. **Problème de mise à jour des tâches** :
   - **Difficulté** : Lors de la mise à jour d'une tâche, la tâche restait inchangée dans la base de données et revenait à son état initial après actualisation de la page.
   - **Solution** : J'ai modifié la fonction `handleSave` pour accepter un paramètre de tâche et utiliser les données de cette tâche pour envoyer une requête PATCH à l'endpoint `/tasks/:id`.

2. **Affichage des notifications** :
   - **Difficulté** : Afficher des messages de confirmation lorsque des tâches sont ajoutées ou mises à jour.
   - **Solution** : J'ai ajouté un état `notification` pour stocker le message de notification et utilisé le composant `Snackbar` pour afficher ce message. Les fonctions `handleAdd` et `handleSave` mettent à jour cet état avec le message approprié après avoir effectué leurs opérations respectives.


#### Conclusion

En conclusion, les choix et décisions pris tout au long du projet ont été guidés par la nécessité de créer une interface utilisateur réactive et moderne, de gérer efficacement l'état local et les effets secondaires, et de fournir une expérience utilisateur fluide avec des notifications appropriées. Les points d'arrêt et les difficultés rencontrées ont été résolus en ajustant les fonctions asynchrones et en utilisant les composants de Material-UI de manière appropriée. Les fonctions `handleFetchTasks`, `handleDelete`, `handleSave`, et `handleAdd` ont été conçues pour interagir avec l'API et mettre à jour l'état local en conséquence, garantissant ainsi que l'interface utilisateur reste synchronisée avec les données de la base de données.
