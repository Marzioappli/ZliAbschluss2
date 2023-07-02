SELECT *
FROM [dbo].[PersonalInfo] AS Schule
INNER JOIN [dbo].[Berufsfachschule] AS Info ON Schule.Id = Info.Id
INNER JOIN [dbo].[Beruf] AS Beruf ON Schule.ID = Beruf.ID 
INNER JOIN [dbo].[Fachrichtung] AS Fach ON Schule.ID = Fach.ID
INNER JOIN [dbo].[Gruppe] AS Gruppe ON Schule.ID = Gruppe.ID