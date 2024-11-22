#!/bin/bash

# Fonction pour vérifier l'état de la branche distante
check_for_remote_changes() {
    # Mettre à jour la référence locale sans modifier les fichiers de travail
    git fetch origin

    # Comparer la branche locale avec la branche distante
    LOCAL=$(git rev-parse @)
    REMOTE=$(git rev-parse @{u})
    BASE=$(git merge-base @ @{u})

    if [ "$LOCAL" = "$REMOTE" ]; then
        echo "✅ La branche locale est à jour avec la branche distante."
        return 0
    elif [ "$LOCAL" = "$BASE" ]; then
        echo "🚨 Votre branche est en retard. Vous devez faire un pull avant de pousser."
        return 1
    elif [ "$REMOTE" = "$BASE" ]; then
        echo "🚨 Votre branche a des commits en avance sur la branche distante. Attention aux conflits potentiels."
        return 0
    else
        echo "🚨 Votre branche et la branche distante ont divergé. Vous devez synchroniser avant de pousser."
        return 2
    fi
}

# Ajouter les modifications au staging
git add .

# Vérifier s'il y a des modifications en attente
if [ -z "$(git diff --cached)" ]; then
    echo "❌ Aucun changement à committer."
    exit 0
fi

# Demander un message de commit à l'utilisateur
read -p "💬 Quel message de commit voulez-vous utiliser ? " commit_message

# Faire le commit
git commit -m "$commit_message"

# Vérifier les changements distants
check_for_remote_changes
REMOTE_STATUS=$?

if [ $REMOTE_STATUS -eq 1 ]; then
    echo "📥 Pull des modifications depuis le dépôt distant..."
    git pull origin back-end
    if [ $? -ne 0 ]; then
        echo "❌ Échec lors du pull. Résolvez les conflits avant de continuer."
        exit 1
    fi
elif [ $REMOTE_STATUS -eq 2 ]; then
    echo "❌ La branche a divergé. Résolvez manuellement la situation avant de continuer."
    exit 1
fi

# Pousser les modifications
echo "📤 Pousser les modifications sur le dépôt distant..."
git push
if [ $? -eq 0 ]; then
    echo "✅ Modifications poussées avec succès !"
else
    echo "❌ Échec lors du push. Vérifiez les erreurs."
    exit 1
fi
