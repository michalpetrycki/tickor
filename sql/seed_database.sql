USE Tickor;
GO

INSERT INTO Person (email, username, kind) 
    VALUES ('admin@tickor.com', 'administrator', 'administrator');
INSERT INTO Person (email, username, kind) 
    VALUES ('robot@tickor.com', 'robot', 'robot');
INSERT INTO Person (email, username, kind) 
    VALUES ('jon@doe.com', 'jon', 'joe');
GO
    
INSERT INTO Client (name, kind, logo) 
    VALUES('Michal P', 'person', 'https://www.shutterstock.com/shutterstock/photos/764354755/display_1500/stock-vector-logo-design-abstract-people-vector-template-illustration-design-of-logotype-business-happy-person-764354755.jpg');
INSERT INTO Client (name, kind, logo) 
    VALUES('Ion Fabrications', 'company', 'https://img.freepik.com/free-vector/detailed-welder-logo-template_52683-66621.jpg?w=826&t=st=1686164603~exp=1686165203~hmac=3bf74f161ccdd2efc26a3f791ddeea0145c703169d3826605bc222de1da5a21c');
INSERT INTO Client (name, kind, logo) 
    VALUES('Unibottled', 'company', 'https://static.vecteezy.com/system/resources/previews/011/742/444/large_2x/isolated-illustration-of-a-bottle-of-maple-syrup-packaging-design-template-logo-free-vector.jpg');
GO

INSERT INTO Project (name, active, logo, clientID) 
    VALUES('Fresh Fashion', 1, 'https://img.freepik.com/free-vector/creative-hurricane-logo-template_23-2149209625.jpg?w=826&t=st=1686164718~exp=1686165318~hmac=da5767ab7302fbfc461e2a0b5b3b9957f5ebf2bb4c72bd8f5c9b8070bedbf953', 1);
INSERT INTO Project (name, active, logo, clientID)
    VALUES('Chic Choice', 1, 'https://venngage-wordpress.s3.amazonaws.com/uploads/2021/12/House-Agent-Broker-Business-Logo-Template.png', 2);
INSERT INTO Project (name, active, logo, clientID) 
    VALUES('Modern Maven', 1, 'https://images.template.net/wp-content/uploads/2014/09/Farm-Logo.jpg?width=550', 3);
INSERT INTO Project (name, active, logo, clientID) 
    VALUES('Trendy Twist', 1, 'https://marketplace.canva.com/EAE9407gQAE/1/0/1600w/canva-rose-gold-photography-circle-logo-9uq8B--Pjcs.jpg', 2);
INSERT INTO Project (name, active, logo, clientID) 
    VALUES('Refined Runway', 1, 'https://media.istockphoto.com/id/1055624048/vector/microscope-and-monitor-logo-design-scientific-research-vector-design-medical-laboratory.webp?s=2048x2048&w=is&k=20&c=vUQKx3HUulP9Jv-Tt0fLA9IGGAPbRubZbynaBYQ6b-Q=', 3);
INSERT INTO Project (name, active, logo, clientID) 
    VALUES('Snazzy Solutions', 1, 'https://images.template.net/wp-content/uploads/2014/09/Flare-Focus.jpg?width=550', 1);
INSERT INTO Project (name, active, logo, clientID) 
    VALUES('Polished Pizzazz', 1, 'https://seeklogo.com/images/A/animulus-cracked-circle-t-shirt-logo-5607C4CB58-seeklogo.com.png', 1);
INSERT INTO Project (name, active, logo, clientID) 
    VALUES('Elegant Edge', 1, 'https://cdn4.vectorstock.com/i/1000x1000/41/03/bird-company-logo-template-design-vector-33654103.jpg', 3);
INSERT INTO Project (name, active, logo, clientID) 
    VALUES('Swanky Selections', 1, 'https://graphicsfamily.com/wp-content/uploads/edd/2023/06/Cristian-Stone-Spedition-999x999.jpg', 2);
INSERT INTO Project (name, active, logo, clientID) 
    VALUES('Dapper Desings', 1, 'https://image.pngaaa.com/95/2572095-middle.png', 2);
INSERT INTO Project (name, active, logo, clientID) 
    VALUES('Styling Sensei', 1, 'https://static.vecteezy.com/system/resources/previews/020/806/106/large_2x/chocolate-logo-sample-vector.jpg', 3);
GO

INSERT INTO IssueCategory (name) VALUES ('New feature');
INSERT INTO IssueCategory (name) VALUES ('Bug');
GO

INSERT INTO IssueStatus (name) VALUES ('unapproved');
INSERT INTO IssueStatus (name) VALUES ('approved');
INSERT INTO IssueStatus (name) VALUES ('closed');
INSERT INTO IssueStatus (name) VALUES ('hold');
INSERT INTO IssueStatus (name) VALUES ('closure request');
GO

INSERT INTO Issue (statusID, subject, name, categoryID, projectID) VALUES (2, 'Implement new big feature', 'Big boy', 1, 1);
INSERT INTO Issue (statusID, subject, name, categoryID, projectID) VALUES (3, 'There''s a snake in my shoe', 'Ssssnake', 2, 1);
INSERT INTO Issue (statusID, subject, name, categoryID, projectID) VALUES (4, 'Modal doesn''t close properly on X click', 'Stupid modal', 2, 2);
INSERT INTO Issue (statusID, subject, name, categoryID, projectID) VALUES (5, 'Request for super duper shiny modal', 'Shining star', 1, 3);
GO
