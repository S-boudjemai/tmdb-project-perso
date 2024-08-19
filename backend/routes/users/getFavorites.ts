db.connect((err: any) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    process.exit(1);
  }
  console.log("Connecté à la base de données");
});

router.get(
  "/users/favorites/:id_firebase",
  (
    req: { params: { id_firebase: any } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: {
          (arg0: { message?: string; favorites?: any }): void;
          new (): any;
        };
      };
    }
  ) => {
    const { id_firebase } = req.params;
    // récupérer les favoris selon l'id

    const sql = "SELECT favorites FROM users WHERE id_firebase = ?";
    db.query(sql, [id_firebase], (err: any, result: string | any[]) => {
      if (err) {
        console.error("Erreur lors de la récupération des favoris :", err);
        return res.status(500).json(err);
        // error récupération des favoris
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Favoris non trouvé" });
        // S'il n'y a pas de résultats
      }
      res.status(200).json({
        favorites: result[0].favorites,
        // Les résultats des favoris
      });
    });
  }
);

module.exports = router;
